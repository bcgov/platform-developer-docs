---
title: NSX Networking 

slug: nsx-networking

description: 

keywords: NSX, SDN, cluster, SNAT,  openshift

page_purpose: 

audience: technical lead, developer

author: Steven Barre

content_owner: Steven Barre

sort_order: 
---

# NSX SDN Cluster <!-- omit in toc -->

- [Segment](#segment)
- [SNAT IP](#snat-ip)
- [NetPol differences](#netpol-differences)
  - [Egress](#egress)
  - [Route access](#route-access)
- [Forward Proxy](#forward-proxy)
- [Data Classification](#data-classification)

## Segment

Your namespace will come with a /24 subnet for your pods. This subnet is private, but routable within the datacenter. If you do not have a SNAT IP, then you can use this subnet in traditional firewall rules when connecting to the classic datacenter.

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
          cidr: # IP of master server
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

TODO: all routes get a private IP? Howto setup public rotues?

## Forward Proxy

While the `*-tools` namespace has a public SNAT IP and can easily reach the internet, the rest of the namespaces cannot directly connect to the internet.

If you wish to connect to the internet, you must go via the Forward Proxy.

Kamloops: swpxkam.gov.bc.ca / 142.34.229.249

Calgary: swpxcal.gov.bc.ca / 142.34.94.249

You will also need a netpol to allow the egress from your pods to the forward proxy.

The URL allowlist for the proxy is shared by the whole /16 subnet. So if you need access to additional URLs, please contact the Ops Team to request a change to the URL list.

## Data Classification

In `*-tools` namespaces, all pods will be treated as having a `low` data classification, regardless of labels. This is so that build pods, which can't be labeled, are treated properly by the guardrails.

In all other namespaces, pods MUST have a label of `DataClass` with a value of either `Low`, `Medium`, or `High`. Unlabeled pods will be unable to communicate.

`DataClass=Low` pods can optionally have a label of `Internet-Ingress=DENY` which prevents them from getting access via Routes, but then let's them talk to High Data Class workloads.

You can read more about the [SDN Security Classification Model](https://bcgov.sharepoint.com/:w:/r/teams/04091/Shared%20Documents/SDN/Core%20Documents/SDN%20Security%20Classification%20Model.docx?d=wa10f5e8a5863475a9b6fc46d8b88e18f&csf=1&web=1&e=sZBEAc) on Sharepoint.
