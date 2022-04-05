---
title: Set up TCP connectivity on the Private Cloud Openshift Platform

description: Describes how to enable Silver, Gold, and GoldDR cross-cluster communication using the Porter Operator.

keywords: TCP, TCP connectivity, silver, silver cluster, gold, golddr, gold cluster, golddr cluster, dr, disaster, recovery, porter, porter operator

page purpose: Discusses how to enable communication between resources in the Gold/GoldDR clusters or between the Silver cluster and other networks.

audience: developer

author: Ian Watts

content owner: Ian Watts
---

# Set up TCP connectivity on the Private Cloud Openshift Platform
Use this page to learn to configure direct TCP access to services in the Private Cloud Openshift Platform using the Porter Operator.

## On this page
1. [Direct TCP access](#direct-tcp-access)
3. [Set up TCP connectivity in the Silver Cluster](#silver-setup)
   1. [Confirm Service information](#silver-confirm-service-information)
   2. [Create TransportServerClaim](#silver-create-tsc)
   3. [Create network policy](#silver-create-network-policy)
   3. [Test Access](#silver-test-access)
3. [Set up TCP connectivity on the Gold Kamloops/Gold Calgary Cross-Cluster](#setup-gold-golddr)
    1. [Confirm Service information](#gold-confirm-service-information)
    2. [Create TransportServerClaim](#gold-create-transportserverclaim)
    3. [Create network policy](#gold-create-network-policies)
    4. [Check endpoints](#gold-check-endpoints)
5. [Troubleshooting](#troubleshooting)

## Direct TCP access<a name="direct-tcp-access"></a>
Project teams may enable direct non-HTTPS TCP access to services within their namespaces by creating a TransportServerClaim resource.

This feature is available in all production clusters, including Silver and Gold/GoldDR.

The project must meet the following requirements:
- Project set in either the Silver cluster or Gold/GoldDR clusters
- Initial application installation, including services
- Administrative access to the namespaces
- `oc` command line tool

## Set up TCP connectivity in the Silver Cluster<a name="silver-setup"></a>
Use the Porter Operator to enable direct TCP access to your services in the Silver cluster.

### Confirm service information<a name="silver-confirm-service-information"></a>
A `TransportServerClaim` is associated with a Service. Make sure that the Service exists and is associated with pods that are running so that you can verify the functionality of the connection after it's created.

Use the following command:

```
$ oc -n yourlicenceplate-dev get services
NAME               TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)     AGE
yourservice        ClusterIP   10.98.xx.yy     <none>        8000/TCP    10d
```

### Create `TransportServerClaim`<a name="silver-create-tsc"></a>
Create one `TransportServerClaim` for each Service/port combination in each namespace. For example:
```
# yourservice-tsc.yaml
apiVersion: porter.devops.gov.bc.ca/v1alpha1
kind: TransportServerClaim
metadata:
  name: yourservice-tsc
  namespace: yourlicenceplate-dev
spec:
  monitor:
    interval: 10
    timeout: 10
    type: tcp
  service: yourservice
  servicePort: 8000
```
Save the file and create the `TransportServerClaim`:

`$ oc -n yourlicenceplate-dev apply -f yourservice-tsc.yaml`

The Porter Operator creates the `TransportServer` resource.

**Note:** The short version of the plural `TransportServerClaims` is `tscs`.  The short form of `TransportServer` is `ts`.

Confirm the creation of the `TransportServerClaim`:
```
(silver)$ oc -n yourlicenceplate-dev get tscs
NAME             AGE
yourservice-tsc  1m
```

### Create network policy<a name="silver-create-network-policy"></a>
Create a `NetworkPolicy` to allow traffic to reach the service's pods through the load balancers. Use the following template to create a `NetworkPolicy`. Set the `namespace` and `podSelector` as appropriate.

The `podSelector` parameters must match the pods that are associated with the Service used in the `TransportServerClaim`.

```
# allow-from-f5-ingress.yaml
kind: NetworkPolicy
apiVersion: networking.k8s.io/v1
metadata:
  name: allow-from-f5-ingress
  namespace: yourlicenceplate-dev
spec:
  podSelector:
    matchLabels:
      name: yourappslabel
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              network.openshift.io/policy-group: ingress
  policyTypes:
    - Ingress
```

Create the `NetworkPolicy` in your namespace:

`$ oc -n yourlicenceplate-dev apply -f allow-from-f5-ingress.yaml`

### Test access<a name="silver-test-access"></a>
After you create the `TransportServerClaim`, the Porter Operator creates a `TransportServer` in your namespace.
```
(silver)$ oc -n yourlicenceplate-dev get ts
NAME              VIRTUALSERVERADDRESS   VIRTUALSERVERPORT   POOL          POOLPORT   IPAMLABEL   IPAMVSADDRESS   STATUS   AGE
yourservice-tsc   142.34.194.68          65555               yourservice   8000                   None            Ok       21d
```
You may have to submit a firewall request in order to allow traffic in to the IP address and port indicated in VIRTUALSERVERADDRESS and VIRTUALSERVERPORT.

To test connectivity from a Linux machine, use the following example and replace `65555` with the port shown in the previous command.
```
$ timeout 5 bash -c ">/dev/tcp/142.34.194.68/65555"; echo $?
0
```
Any return code other than `0` indicates a problem.  If that's the case, inquire about the firewall and go to [Troubleshooting](#troubleshooting).

## Set up TCP connectivity on the Gold Kamloops/Gold Calgary Cross-Cluster<a name="setup-gold-golddr"></a>
The Gold and GoldDR clusters are designed to be used in tandem. Production applications are typically served from the Gold cluster. Deployments in the GoldDR cluster are identical to Gold and are meant to be quickly activated as the live production system if there is a problem with the Gold cluster.

Use the Porter Operator to enable direct TCP access from Gold to GoldDR and vice versa. For example, this may be used for database replication.

### Confirm Service information<a name="gold-confirm-service-information"></a>
A `TransportServerClaim` is associated with a Service. Make sure that the Service exists and is associated with a functioning application so you can verify the functionality of the connection after it's created. For example, to create a connection between databases in each cluster, the databases should already be running and reachable by their Service.

Use the following command:
```
$ oc get services -n yourlicenceplate-dev
NAME               TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)     AGE
yourservice        ClusterIP   10.98.xx.yy     <none>        8000/TCP    10d
```

### Create `TransportServerClaim`<a name="gold-create-transportserverclaim"></a>
**Note**: `TransportServerClaims` are created only in Gold, not in GoldDR.

The `TransportServerClaim` is associated with a Service and a port. Create one `TransportServerClaim` for each Service/port combination in each namespace. For example:
```
# yourservice-tsc.yaml
apiVersion: porter.devops.gov.bc.ca/v1alpha1
kind: TransportServerClaim
metadata:
  name: yourservice-tsc
  namespace: yourlicenceplate-dev
spec:
  monitor:
    interval: 10
    timeout: 10
    type: tcp
  service: yourservice
  servicePort: 8000
```
Save the file and create the `TransportServerClaim`.

`$ oc -n yourlicenceplate-dev apply -f yourservice-tsc.yaml`

The Porter Operator creates the `TransportServers` in both Gold and GoldDR.

Confirm the creation of the `TransportServerClaim`:
```
(gold)$ oc -n yourlicenceplate-dev get tscs
NAME             AGE
yourservice-tsc  1m
```

### Create network policy<a name="gold-create-network-policies"></a>
Create a `NetworkPolicy` to allow traffic to reach the service's pods through the load balancers. Use the following template to create a `NetworkPolicy`. Set the `namespace` and `podSelector` as appropriate.

The `podSelector` parameters must match the pods that are associated with the Service used in the `TransportServerClaim`.

```
# allow-from-f5-ingress.yaml
kind: NetworkPolicy
apiVersion: networking.k8s.io/v1
metadata:
  name: allow-from-f5-ingress
  namespace: yourlicenceplate-dev
spec:
  podSelector:
    matchLabels:
      name: yourappslabel
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              network.openshift.io/policy-group: ingress
  policyTypes:
    - Ingress
```

Create the `NetworkPolicy` in your namespaces in both Gold and GoldDR:

`$ oc -n yourlicenceplate-dev apply -f allow-from-f5-ingress.yaml`

### Check endpoints<a name="gold-check-endpoints"></a>
After you create the `TransportServerClaim`, the Porter Operator automatically creates new endpoints in your namespace in both Gold and GoldDR. The endpoint name is the Service name followed by either "-gold" or "-golddr".

Verify the endpoints:
```
(gold)$ oc -n yourlicenceplate-dev get endpoints | grep golddr
yourservice-golddr  142.34.64.62:36760	1m

(golddr)$ oc -n yourlicenceplate-dev get endpoints | grep gold
yourservice-gold    142.34.229.62:37650 1m
```

Confirm connectivity from any pod in either cluster. Replace `65555` with the port number of your `TransportServerClaim`, as shown in the output of `oc get endpoints`.

```
(gold)$ oc -n yourlicenceplate-dev rsh somepodname
> timeout 5 bash -c ">/dev/tcp/142.34.64.62/65555"; echo $?
0

(golddr)$ oc -n yourlicenceplate-dev rsh somepodname
> timeout 5 bash -c ">/dev/tcp/142.34.229.62/65555"; echo $?
0
```
Any return code other than `0` indicates a problem.  If that's the case, inquire about the firewall and go to [Troubleshooting](#troubleshooting).

## Troubleshooting<a name="troubleshooting"></a>
Resolve issues by trying the following:
* Check the Service name used in the `TransportServerClaim`. It must match the existing Service.
* Make sure that there are pods associated with that Service and that they are operating correctly.
* Confirm that the `NetworkPolicy` has been created and that its `podSelector` field matches the pods that should be reachable through the `TransportServerClaim`.
* Check the `TransportServerClaim` itself for status information.
```
$ oc -n yourlicenceplate-dev get tscs yourservice-tsc -o yaml
...
status:
  address: 142.34.64.62
  port: "65555"
```

---
Related links:
-

Rewrite sources:

---
