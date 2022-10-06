# OpenShift Network Policies

Without a network policy in place, all pods in a namespace are accessible from other pods and network endpoints. To isolate one or more pods in a namespace, you can create NetworkPolicy objects in that namespace to indicate the allowed incoming connections. Namespace administrators can create and delete NetworkPolicy objects within their own namespaces. A 'deny by default' policy is automatically created and active in all namespaces on the platform. 

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

**Note:** 
The primary BC Gov OpenShift clusters are configured with OpenShift SDN networking which does not support Egress Network Policies.  This applies to the following OpenShift Clusters: CLAB, KLAB, SILVER, GOLD, GOLD-DR.  
KLAB2 and Emerald clusters use a different SDN technology (VMWare NSX-T) which DOES support (and requires) Egress Network Policies.  Details on NSX Networking can be found here: https://cloud.gov.bc.ca/private-cloud/nsx-networking/

## Network Policy Structure


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
        - namespaceSelector:
            matchLabels:
              project: myproject
        - podSelector:
            matchLabels:
              role: frontend
      ports:
        - protocol: TCP
          port: 5978
```
* **namespace:** network polices are scoped to namespaces.
* **podSelector:** selects the grouping of pods to which the policy applies or empty podSelector selects all pods in the namespace.
* **policyTypes:** list which may include either Ingress, Egress, or both. 
* **ingress:** each rule allows traffic which matches both the from and ports sections.
* **egress:** each rule allows traffic which matches both the to and ports sections.
* **namespaceSelector:** This selects particular namespaces for which all Pods should be allowed as ingress sources or egress destinations.
* **ipBlock:** This selects particular IP CIDR ranges to allow as ingress sources or egress destinations. These should be cluster-external IPs, since Pod IPs are ephemeral and unpredictable.
* **ports.port:** The port on the given protocol. This can either be a numerical or named port on a pod. If this field is not provided, this matches all port names and numbers. If present, only traffic on the specified protocol AND port will be matched.
* **ports.protocol:** The protocol (TCP, UDP, or SCTP) which traffic must match. If not specified, this field defaults to TCP.
* **podSelector:** This selects particular Pods in the same namespace as the NetworkPolicy which should be allowed as ingress sources or egress destinations.


**NOTE:** namespaceSelector and podSelector can be used together in A single to/from entry that selects particular Pods within particular namespaces. Be careful to use correct YAML syntax!

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

contains a single from element allowing connections from Pods with the label role=client in namespaces with the label user=alice. But this policy:

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

contains two elements in the from array, and allows connections from Pods in the local Namespace with the label role=client, or from any Pod in any namespace with the label user=alice.

## Deny By Default Policy

You'll notice that there is a `platform-services-controlled-deny-by-default` network policy in your namespace that will show up even if you delete it! This is controlled by the platform administrators.

```yaml
kind: NetworkPolicy
apiVersion: networking.k8s.io/v1
metadata:
  name: platform-services-controlled-deny-by-default
  namespace: ad204f-dev
  labels:
    devops.gov.bc.ca/argocd-app: ad204f
    environment: dev
    name: ad204f
    provisioned-by: argocd
spec:
  podSelector: {}
  policyTypes:
    - Ingress
```
The deny by default network policy is there to enforce the zero trust networking or walled garden pattern. So we start by denying all then build our allow list.

To test the `deny-by-default` network policy and see if you can curl the http server running in one pod from another pod. Update the command below based on your pod name and pod ip address.

`oc -n [-dev] rsh [pod1 name] curl -v [pod2 ip]:8080`

what it should look like:

`oc -n [-dev] rsh hello-world-nginx-599d5d8898-2k9n2 curl -v 10.97.58.168:8080`

The curl command should not complete and eventually time out.

You can also try to navigate to the route URL from your browser.

https://route-https-yourapp-dev.apps.silver.devops.gov.bc.ca/

This should also fail. If it does seem to be working try from a incognito window or clearing your browsers cache.

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

You can test out connectiving using a curl command :

`oc -n [-dev] rsh [pod1 name] curl -v [pod2 ip]:8080`

You should now recieve a response returning from the curl command.

## Allow from OpenShift Router

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


## Allow only from specific Pod & Port

If you want to only allow specific traffic to access a pod on a specific port you can do that too!

Here is an example of a network policy which applies to only specific pods:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-nginx-2-to-mysql
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

Once you have your network policy in place you'll need to set up some more pods to test. You can scale your deployment down to 1 pod to make things more straight forward. Keep in mind if you have any autoscalers in place.


If you would like a more in-depth testing of pod-to-pod or ingress/egress communications, please see the OCP 201 training materials:
https://github.com/BCDevOps/devops-platform-workshops/blob/master/openshift-201/network-policy.md


## Links

* https://docs.openshift.com/container-platform/4.8/networking/ovn_kubernetes_network_provider/about-ovn-kubernetes.html
* https://kubernetes.io/docs/concepts/services-networking/network-policies/
* https://docs.openshift.com/acs/3.70/operating/manage-network-policies.html
