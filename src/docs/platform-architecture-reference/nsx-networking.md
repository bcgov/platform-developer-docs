---
title: NSX networking 

slug: nsx-networking

description: The new Emerald cluster is running on VMware NSX and leveraging the SDN provided by it. There are several differences from the traditional OCP clusters documented here to assist product teams on getting up to speed.

keywords: NSX, SDN, cluster, SNAT, OpenShift

page_purpose: Educate product teams on the specific requirements for NSX clusters

audience: technical lead, developer

author: Steven Barre

content_owner: Steven Barre

sort_order: 
---

# NSX networking

The new Emerald cluster is running on VMware NSX and leveraging the SDN provided by it. There are several differences from the traditional OCP clusters documented here to assist product teams on getting up to speed with the NSX SDN cluster.

## On this page
- [API](#api)
  - [Web console](#web-console)
- [Segment](#segment)
- [SNAT IP](#snat-ip)
- [NetPol differences](#netpol-differences)
  - [Egress](#egress)
  - [Route access](#route-access)
- [Vault](#vault)
- [Forward proxy](#forward-proxy)
- [Data classification](#data-classification)

## API

The API for the NSX clusters is still publicly available so that GitHub Actions and other external tools can connect.

### Web console

The web console is limited to only within government networks. Please connect to the VPN or be on an office network to access the web console.

## Segment

Each namespace will come with a /24 subnet for your pods. This subnet is private, but routable within the datacenter. You can use this subnet in traditional firewall rules when connecting to the classic datacenter, for non `*-tools` namespaces.

```console
# oc get ns steve-test -o yaml | grep subnet
    ncp/subnet-0: 10.90.89.0/24
```

## SNAT IP

`*-tools` namespaces have a SNAT IP and it will be listed in the `annotations` of the namespace.

```console
# oc get ns steve-tools -o yaml | grep snat
    ncp/snat_ip: 142.34.x.x
```

The SNAT IP will be used for all traffic leaving your namespace and should be used instead in firewall rules. This is so that build pods can easily connect to the internet and pull down code. Build pods cannot be labeled and so need to have less guardrails applied.

## NetPol differences

### Egress

Egress is now managed by network policy in addition to Ingress. The deny by default policy now includes some rules to allow access to DNS, the internal image registry, and the Kube API.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: platform-services-controlled-deny-by-default
  namespace: steve-test
spec:
  podSelector: {}
  egress:
    - ports:
        - protocol: TCP
          port: 5353
        - protocol: UDP
          port: 5353
      to:
        - podSelector:
            matchLabels:
              dns.operator.openshift.io/daemonset-dns: default
          namespaceSelector:
            matchLabels:
              kubernetes.io/metadata.name: openshift-dns
    - ports:
      - port: 5000
        protocol: TCP
      to:
      - namespaceSelector:
          matchLabels:
            kubernetes.io/metadata.name: openshift-image-registry
        podSelector:
          matchLabels:
            docker-registry: default
    - ports:
      - port: 6443
        protocol: TCP
      to:
      - ipBlock:
          cidr: # IP of master server 1
      - ipBlock:
          cidr: # IP of master server 2
      - ipBlock:
          cidr: # IP of master server 3
  policyTypes:
    - Ingress
    - Egress
```

To allow two pods to communicate, you need to create two policies allowing the ingress and egress traffic.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: pgsql-ingress-django
  namespace: steve-test
spec:
  ingress:
  - from:
    - podSelector:
        matchLabels:
          name: django-psql-persistent
    ports:
    - port: 5432
      protocol: TCP
  podSelector:
    matchLabels:
      name: postgresql
  policyTypes:
  - Ingress
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: django-egress-pgsql
  namespace: steve-test
spec:
  egress:
  - to:
    - podSelector:
        matchLabels:
          name: postgresql
    ports:
    - port: 5432
      protocol: TCP
  podSelector:
    matchLabels:
      name: django-psql-persistent
  policyTypes:
  - Egress
```

More reading: [RH Blog - Guide to Kubernetes Egress Network Policies](https://cloud.redhat.com/blog/guide-to-kubernetes-egress-network-policies)

### Route access

Route traffic no longer goes though the haproxy pods on the ingress nodes, and instead is managed by VMware AVI. You no longer need a netpol to allow this traffic. Simply creating the route allows the traffic in.

Currently, all routes get a public IP. However DNS resolution for `*.apps.emerald.devops.gov.bc.ca` only works from within SPANBC. So you need to be on a government VPN or in a government office to resolve the IP.

Vanity domains used for production apps can have their DNS created with whichever visibility is desired in NNR. The IP for the route is listed in its `status` field.

```console
# oc -n e595b8-dev get route django-psql-example -o yaml | grep -A4 status:
status:
  ingress:
  - conditions:
    - lastTransitionTime: "2022-09-14T21:45:30Z"
      message: 142.34.<redacted>
      status: "True"
      type: Admitted
    host: django-psql-example-e595b8-dev.apps.klab2.devops.gov.bc.ca
    routerName: ako-OCP4KLAB2
    wildcardPolicy: None
```

Soon, you will be able to customize and choose a public or private IP and an associated DataClass for your route via an Annotation.

## Vault

To use the vault injector on your pods you will need some netpols to allow the traffic. Currently High DataClass pods can't connect to Vault.

```yaml
kind: NetworkPolicy
apiVersion: networking.k8s.io/v1
metadata:
  name: init-egress-app-to-vault-injector
spec:
  podSelector:
    matchLabels:
      app: test
  egress:
    - ports:
        - protocol: TCP
          port: 8080
      to:
        - podSelector:
            matchLabels:
              app.kubernetes.io/name: vault-agent-injector
          namespaceSelector:
            matchLabels:
              kubernetes.io/metadata.name: openshift-bcgov-vault
    - ports:
        - protocol: TCP
          port: 443
      to:
        - ipBlock:
            cidr: 142.34.229.4/32
        - ipBlock:
            cidr: 142.34.64.4/32
  policyTypes:
    - Egress
```

## Forward proxy

While the `*-tools` namespace has a public SNAT IP and can easily reach the internet, the rest of the namespaces cannot directly connect to the internet.

If you wish to connect to the internet, you must go via the Forward Proxy.

Kamloops: swpxkam.gov.bc.ca:8080 / 142.34.229.249:8080

Calgary: swpxcal.gov.bc.ca:8080 / 142.34.94.249:8080

You will also need a netpol to allow the egress from your pods to the forward proxy.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: django-egress-proxy
  namespace: steve-test
spec:
  egress:
  - to:
    - ipBlock:
        cidr: 142.34.229.249
    ports:
    - port: 8080
      protocol: TCP
  podSelector:
    matchLabels:
      name: django-psql-persistent
  policyTypes:
  - Egress
```

Most applications recognize the environment variables for proxies. Set them on your pod and see if things "just work".

```
HTTP_PROXY=http://swpxkam.gov.bc.ca:8080
HTTPS_PROXY=https://swpxkam.gov.bc.ca:8080
NO_PROXY=.gov.bc.ca
```

The URL allowlist for the proxy is shared by the whole /16 subnet. So if you need access to additional URLs, please contact the Ops Team to request a change to the URL list.

## Data classification

In `*-tools` namespaces, all pods will be treated as having a `low` data classification, unless labeled otherwise. This is so that build pods, which can't be labeled, are treated properly by the guardrails.

In all other namespaces, pods MUST have a label of `DataClass` with a value of either `Low`, `Medium`, or `High`. Unlabeled pods will be unable to communicate.

`DataClass=Low` pods can optionally have a label of `Internet-Ingress=DENY` which prevents them from getting access via Routes, but then lets them talk to High Data Class workloads.

You can read more about the [SDN Security Classification Model](https://bcgov.sharepoint.com/:w:/r/teams/04091/Shared%20Documents/SDN/Core%20Documents/SDN%20Security%20Classification%20Model.docx?d=wa10f5e8a5863475a9b6fc46d8b88e18f&csf=1&web=1&e=sZBEAc) by requesting access on Sharepoint.
