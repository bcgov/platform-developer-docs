# NSX SDN Cluster

## Segment

Your namespace will come with a /24 subnet for your pods. This subnet is private, but routable within the datacenter. If you do not have a SNAT IP, then you can use this subnet in traditional firewall rules when connecting to the classic datacenter.

```console
# oc get ns steve-test -o yaml | grep subnet
    ncp/subnet-0: 10.90.89.0/24
```

## SNAT IP

If your namespace has a SNAT IP, it will be listed in the `annotations` of the namespace.

```console
# oc get ns steve-test -o yaml | grep snat
    ncp/snat_ip: 142.34.x.x
```

If your namespace has a SNAT IP, it will be used for all traffic leaving your namespace and should be used instead in firewall rules.

## NetPol differences

### Egress

Egress is now managed by network policy in addition to Ingress. The deny by default policy now includes some rules to allow access to DNS.

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

TODO: how to get builds to run?

### Route access

Route traffic no longer goes though the haproxy pods on the ingress nodes, and instead is managed by VMware AVI. You no longer need a netpol to allow this traffic. Simply creating the route allows the traffic in.

TODO: all routes get a private IP? Howto setup public rotues?
