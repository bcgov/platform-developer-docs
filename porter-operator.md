---
title: Cross-Cluster Network Connectivity ("Porter Operator")

description: Enable communication between resources in the Gold/GoldDR clusters or between Silver and other networks

keywords: gold, golddr, dr, disaster, recovery, porter

page purpose: Describes how to enable cross-cluster communication using the Porter Operator

audience: developer

author: Ian Watts

content owner: Ian Watts
---

# Cross-Cluster Network Connectivity
This document describes how to configure direct communication between services in separate clusters.

## Table of Contents
1. [Overview](#overview)
2. [Requirements](#requirements)
3. [Setup for Gold/GoldDR](#setup-gold-golddr)
    1. [Confirm Service information](#confirm-service-information)
    2. [Create TransportServerClaim](#create-transportserverclaim)
    3. [Create network policies](#create-network-policies)
    4. [Check Endpoints](#check-endpoints)
4. [Setup for Silver](#setup-silver)
5. [Troubleshooting](#troubleshooting)

## Overview<a name="overview"></a>
The Gold and GoldDR clusters are designed to be used in tandem.  Production apps will typically be served from the Gold cluster.  Deployments in the GoldDR cluster will be identical to Gold and are meant to be quickly activated as the live production system in the event of a problem with the Gold cluster.  Services that require communication between the clusters, such as databases needing synchronization, use a TransportServerClaim to connect directly to the corresponding service in the other cluster.  A TransportServerClaim may also be configured in the Silver cluster to allow direct access to services in Silver, such as from 'Zone B'.

## Requirements<a name="requirements"></a>
- Gold/GoldDR project set (or Silver for special cases)
- Initial application installation, including Services
- Administrative access to the namespaces
- `oc` command line tool

## Setup for Gold/GoldDR<a name="setup-gold-golddr"></a>
### Confirm Service information<a name="confirm-service-information"></a>
A TransportServerClaim is associated with a Service, so first make sure that the Service exists and is associated with an application that is up and running so that you can verify the functionality of the connection after it is created.  For example, to create a connection between databases in each cluster, the databases should already be running and reachable by their Service.
```
$ oc get services -n yourlicenceplate-dev
NAME               TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)     AGE
yourservice        ClusterIP   10.98.xx.yy     <none>        8000/TCP    10d
```

### Create TransportServerClaim<a name="confirm-service-information"></a>
In Gold/GoldDR, **TransportServerClaims are created only in Gold**, not in GoldDR.

The TransportServerClaim is associated with a Service and a port.  Create one TransportServerClaim for each Service/port combination in each namespace.  For example:
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
Save the file and create the TransportServerClaim.
`$ oc -n yourlicenceplate-dev apply -f yourservice-tsc.yaml`

The Porter Operator will then create the TransportServers in both Gold and GoldDR.

**Note:** The short version of the plural `TransportServerClaims` is `tscs`.

Confirm the creation of the TransportServerClaim:
```
(gold)$ oc -n yourlicenceplate-dev get tscs
NAME             AGE
yourservice-tsc  1m
```

### Create network policies<a name="confirm-service-information"></a>
It's necessary to create a NetworkPolicy to allow traffic to reach the service's pods via the load balancers.  Using the following template, create a NetworkPolicy, setting the `namespace` and `podSelector` as appropriate.

The `podSelector` parameters must match the pods that are associated with the Service used in the TransportServerClaim.

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

Create the NetworkPolicy in your namespaces in both Gold and GoldDR:
`$ oc -n yourlicenceplate-dev apply -f allow-from-f5-ingress.yaml`


### Check Endpoints<a name="check-endpoints"></a>
After creating the TransportServerClaim, the Porter Operator will automatically create new Endpoints in your namespace in both Gold and GoldDR.  The endpoint name will be the Service name followed by either "-gold" or "-golddr".
Verify the endpoints:
```
(gold)$ oc -n yourlicenceplate-dev get endpoints | grep golddr
yourservice-golddr  142.34.64.62:36760	1m

(golddr)$ oc -n yourlicenceplate-dev get endpoints | grep gold
yourservice-gold    142.34.229.62:37650 1m
```

Confirm connectivity from any pod in either cluster.
Note: Replace `65555` with the port number of your TransportServerClaim, as indicated in the output of `oc get endpoints`.
```
(gold)$ oc -n yourlicenceplate-dev rsh somepodname
> timeout 5 bash -c ">/dev/tcp/142.34.64.62/65555"; echo $?
0

(golddr)$ oc -n yourlicenceplate-dev rsh somepodname
> timeout 5 bash -c ">/dev/tcp/142.34.229.62/65555"; echo $?
0
```
Any return code other than `0` indicates a problem.  If that's the case, see the Troubleshooting section below.


## Silver cluster setup<a name="setup-silver"></a>
Creation of a TransportServerClaim in Silver is essentially the same as in Gold, though there will only be a new Service and Endpoints in Silver and not in any other cluster.  You will still need to:
* Create the TransportServerClaim
* Create the NetworkPolicy for ingress from the F5 (load balancer)


## Troubleshooting<a name="troubleshooting"></a>
* Check the Service name used in the TransportServerClaim.  It must match the existing Service.
* Ensure that there are pods associated with that Service and that they are operating correctly.
* Confirm that the NetworkPolicy has been created and that its `podSelector` field matches the pods that should be reachable via the TransportServerClaim.
* Check the TransportServerClaim itself for status information.
```
$ oc -n yourlicenceplate-dev get tscs yourservice-tsc -o yaml
...
status:
  address: 142.34.64.62
  port: "65555"
```

