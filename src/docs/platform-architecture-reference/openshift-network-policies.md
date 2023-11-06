---
title: OpenShift network policies

slug: openshift-network-policies

description: How to use Kubernetes Network Policies for an OpenShift product on the BCGov Private Cloud platform.

keywords: knp, policy, nsx, network, zero trust, default deny, sdn

page_purpose: Describes how to use Kubernetes Network Policies.

audience: technical lead, developer

author: Nick Corcoran

content_owner: Olena Mitovska

sort_order: 3
---
<!-- omit in toc -->
# OpenShift network policies

Without a network policy in place, all pods in a namespace are accessible from other pods and network endpoints. To isolate one or more pods in a namespace, you can create NetworkPolicy objects in that namespace to indicate the allowed incoming connections. Namespace administrators can create and delete NetworkPolicy objects within their own namespaces. A 'deny by default' policy is automatically created and active in all namespaces on the platform. 
<!-- omit in toc -->
## On this page

- [About network policies](#about-network-policies)
- [NetworkPolicy structure](#networkpolicy-structure)
- [Default policy](#default-policy)
- [Allow from the same namespace](#allow-from-the-same-namespace)
- [Allow from OpenShift router](#allow-from-openshift-router)
- [Allow only from specific Pod & port](#allow-only-from-specific-pod--port)
- [Egress example - Deny outbound (egress) traffic from an application](#egress-example---deny-outbound-egress-traffic-from-an-application)
- [Related links](#related-links)

## About network policies

Network Policies allow you to specify how a pod is allowed to communicate with various network entities.

Entities that a Pod can communicate with are identified through a combination of these 3 identifiers:
* Other pods that are allowed (exception: a pod cannot block access to itself)
* Namespaces that are allowed
* IP blocks (exception: traffic to and from the node where a Pod is running is always allowed, regardless of the IP address of the Pod or the node)

When defining a pod or namespace based NetworkPolicy, you use a selector to specify what traffic is allowed to(ingress) and from(egress) the Pod(s) that match the selector. When IP based NetworkPolicies are created, you define policies based on IP blocks (CIDR ranges).

By default, a pod is non-isolated for egress and ingress. All outbound & inbound connections are allowed.
When a pod is isolated for egress or ingress, the only allowed connections from and into the pod are those allowed by the list of some NetworkPolicy that applies to the pod for egress or ingress. The effects of those egress lists combine additively. Network policies do not conflict, they are just additive.

For a connection from a source pod to a destination pod to be allowed, both the egress policy on the source pod and the ingress policy on the destination pod need to allow the connection. If either side does not allow the connection, it will not happen.

By using network policies declarative YAML this code becomes part of your application, ensuring the consistency of “single source of truth” from your codebase.

From OpenShift version 4.10, CLAB, KLAB, SILVER, GOLD, GOLD-DR clusters are now supporting **limited Egress**(see below notes) network policies.
KLAB2 and Emerald clusters use a different SDN technology (VMWare NSX-T) which also DOES support (and requires) Egress Network Policies. Details on NSX Networking can be found in the [IDIR protected content area of the Private Cloud website - Guide for Emerald teams](https://digital.gov.bc.ca/cloud/services/private/internal-resources/emerald/).

## NetworkPolicy structure

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: test-network-policy
  namespace: default
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - ipBlock:
            cidr: 172.17.0.0/16
            except:
              - 172.17.1.0/24
        - namespaceSelector:
            matchLabels:
              project: myproject
        - podSelector:
            matchLabels:
              role: frontend
      ports:
        - protocol: TCP
          port: 6379
  egress:
    - to:
        - ipBlock:
            cidr: 10.0.0.0/24
      ports:
        - protocol: TCP
          port: 5978
```

* **namespace:** network polices are scoped to namespaces.
* **podSelector:** selects the grouping of pods to which the policy applies or empty podSelector selects all pods in the namespace.
* **policyTypes:** list which may include either Ingress, Egress, or both.
* **ingress:** each rule allows traffic which matches both the from and ports sections.
* **egress:** each rule allows traffic which matches both the to and ports sections.
* **ipBlock:** IPBlock describes a particular CIDR (Ex. "192.168.1.1/24","2001:db9::/64") that is allowed to the pods matched by a NetworkPolicySpec's podSelector. The except entry describes CIDRs that should not be included within this rule.
* **cidr:** CIDR is a string representing the IP Block Valid examples are "192.168.1.1/24" or "2001:db9::/64".
* **except:** Except is a slice of CIDRs that should not be included within an IP Block Valid examples are "192.168.1.1/24" or "2001:db9::/64" Except values will be rejected if they are outside the CIDR range.
* **namespaceSelector:** This selects particular namespaces for which all Pods should be allowed as ingress sources or egress destinations.
* **ipBlock:** This selects particular IP CIDR ranges to allow as ingress sources or egress destinations. These should be cluster-external IPs, since Pod IPs are ephemeral and unpredictable.
* **ports.port:** The port on the given protocol. This can either be a numerical or named port on a pod. If this field is not provided, this matches all port names and numbers. If present, only traffic on the specified protocol AND port will be matched.
* **ports.protocol:** The protocol (TCP, UDP, or SCTP) which traffic must match. If not specified, this field defaults to TCP.
* **podSelector:** This selects particular Pods in the same namespace as the NetworkPolicy which should be allowed as ingress sources or egress destinations.

What this above NetwokPolicy example does....:

1. isolates "role=db" pods in the "default" namespace for both ingress and egress traffic (if they weren't already isolated)

2. **Ingress rules** allows connections to all pods in the "default" namespace with the label "role=db" on TCP port 6379 from:

- any pod in the "default" namespace with the label "role=frontend"
- any pod in a namespace with the label "project=myproject"
- IP addresses in the ranges 172.17.0.0–172.17.0.255 and 172.17.2.0–172.17.255.255 (ie, all of 172.17.0.0/16 except 172.17.1.0/24)

3. **Egress rules** allows connections from any pod in the "default" namespace with the label "role=db" to CIDR 10.0.0.0/24 on TCP port 5978

**NOTES:**

- **Limited Egress** in OCP 4.10 clusters. Since our clusters are using `Openshift SDN cluster network provider` (exception with KLAB2 and Emerald), Egress can only be used with `.spec.egress.to.ipBlock` and `.spec.egress.to.ipBlock.except` rules. [OCP 4.10 release note](https://docs.openshift.com/container-platform/4.10/release_notes/ocp-4-10-release-notes.html#ocp-4-10-openshift-sdn-netpol-egress-policies)
- `cidr` and `except` fields can be used in the Ingress and Egress both.
- For the details of NetworkPolicy API specs for OCP 4.10, Please refer [NetworkPolicy networking.k8s.io/v1](https://docs.openshift.com/container-platform/4.10/rest_api/network_apis/networkpolicy-networking-k8s-io-v1.html)
- `namespaceSelector` and `podSelector` can be used together in a single to/from entry that selects particular Pods within particular namespaces, like the examples below. Be careful to use correct YAML syntax!

```yaml
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          user: alice
      podSelector:
        matchLabels:
          role: client
```

contains **a single from element** allowing connections from Pods with the label role=client in namespaces with the label user=alice. But this policy:

```yaml
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          user: alice
    - podSelector:
        matchLabels:
          role: client
```

contains **two elements in the from array**, and allows connections from Pods in the local Namespace with the label role=client, or from any Pod in any namespace with the label user=alice.

## Default policy

You'll notice that there is a `platform-services-controlled-default` network policy in your namespace that will show up even if you delete it! This is controlled by the platform administrators.

```yaml
kind: NetworkPolicy
apiVersion: networking.k8s.io/v1
metadata:
  name: platform-services-controlled-default
  namespace: ad204f-dev
  labels:
    devops.gov.bc.ca/argocd-app: ad204f
    environment: dev
    name: ad204f
    provisioned-by: argocd
spec:
  podSelector: {}
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              kubernetes.io/metadata.name: openshift-operators
    - from:
        - namespaceSelector:
            matchLabels:
              network.openshift.io/policy-group: console
  policyTypes:
  - Ingress
```

The default network policy is there to enforce the zero trust networking or walled garden pattern. So we start by denying all then build our allow list.  It also allows for the use of the Web Terminal Operator by way of the two 'ingress from' rules listed above.

To test the default-deny rule, see if you can curl the http server running in one pod from another pod. Update the command below based on your pod name and pod IP address.

`oc -n [-dev] rsh [pod1 name] curl -v [pod2 IP]:8080`

what it should look like:

`oc -n [-dev] rsh hello-world-nginx-599d5d8898-2k9n2 curl -v 10.97.58.168:8080`

The curl command should not complete and eventually time out.

You can also try to navigate to the route URL from your browser.

`https://route-https-yourapp-dev.apps.silver.devops.gov.bc.ca/`

This should also fail. If it does seem to be working, try from an incognito window or clear your browser's cache.

## Allow from the same namespace

Allowing traffic from pods in the same namespace.

To make pods accept connections from other pods in the same namespace, but reject all other connections from pods in other namespaces, add the following NetworkPolicy object:

```yaml
kind: NetworkPolicy
apiVersion: networking.k8s.io/v1
metadata:
  name: allow-same-namespace
spec:
  podSelector: {}
  ingress:
  - from:
    - podSelector: {}
```

You can test out connectivity using a curl command :

`oc -n [-dev] rsh [pod1 name] curl -v [pod2 IP]:8080`

You should now receive a response returning from the curl command.

## Allow from OpenShift router

As network traffic from the route flows through the OpenShift router pods to our http pods we'll need to allow traffic from those pods. We can do that with a `namespaceSelector` that matches the namespace the router pods live in.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-from-openshift-ingress
spec:
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          network.openshift.io/policy-group: ingress
  podSelector: {}
  policyTypes:
  - Ingress
```

If you now try to access the route from your browser, it should be working.

## Allow only from specific Pod & port

If you want to only allow specific traffic to access a pod on a specific port you can do that too!

Here is an example of a network policy which applies to only specific pods:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-mysql-from-nginx-2
spec:
  podSelector:
    matchLabels:
      name: mysql
  policyTypes:
    - Ingress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              deployment: hello-world-nginx-2
      ports:
        - protocol: TCP
          port: 3306
```

## Egress example - Deny outbound (egress) traffic from an application

If you want to prevent an application from establishing any connections to outside of the Pod.

Assuming your target pod has `app=test` label.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-egress-app-test
spec:
  podSelector:
    matchLabels:
      app: test
  policyTypes:
  - Egress
  egress: []
```

* **podSelector:** matches to `app=test` pods
* **policyTypes:** `Egress` (outboud) traffic will be enforced
* **egress: []** Empty rule set does not whitelist any traffic, therefore all egress (outbound) traffic is blocked. You can drop this field altogether and have the same effect.

Once you have your network policy in place you'll need to set up some more pods to test. You can scale your deployment down to 1 pod to make things more straight forward. Keep in mind if you have any autoscalers in place.

If you would like a more in-depth testing of pod-to-pod or ingress/egress communications, please see the OCP 201 training materials:

- https://github.com/BCDevOps/devops-platform-workshops/blob/master/openshift-201/network-policy.md

## Related links

* https://docs.openshift.com/container-platform/4.10/networking/openshift_sdn/about-openshift-sdn.html
* https://kubernetes.io/docs/concepts/services-networking/network-policies/
* https://docs.openshift.com/acs/3.72/operating/manage-network-policies.html
* https://cloud.redhat.com/blog/guide-to-kubernetes-egress-network-policies
* https://github.com/ahmetb/kubernetes-network-policy-recipes
