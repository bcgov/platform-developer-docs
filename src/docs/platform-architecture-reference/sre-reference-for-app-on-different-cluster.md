# SRE reference for application deployment across different clusters
Last updated: **April 30, 2024**

This document guides application teams deploying applications across different hosting clusters managed by our platform. Each cluster has unique characteristics and Service Level Agreements or SLAs, which should be understood and considered when planning deployment and setting reliability targets.

## Clusters overview
- **Silver Cluster**: Designed for cost-efficiency and suitable for less critical applications
- **Gold Cluster**: Offers higher resilience and is intended for business-critical applications that require robust failover mechanisms
- **Emerald Cluster**: Tailored for applications requiring enhanced security features, specifically for Protect C project applications

## SLA expectations per cluster
For detailed SLA expectations per cluster, please refer to the official [Hosting tiers SLA documentation](https://digital.gov.bc.ca/cloud/services/private/products-tools/hosting-tiers/).

## Impact of Vault and Artifactory on application availability
Vault and Artifactory are crucial components hosted on the Gold cluster, used for secret management and as a image repository manager, respectively. The availability and performance of these services can directly impact the applications depending on them. 

However, it's important to note:

- **SLA for Vault and Artifactory**: Detailed SLA information for these services can be found here:
  - [Vault SLA Details](https://digital.gov.bc.ca/cloud/services/private/products-tools/vault/)
  - [Artifactory SLA Details](https://digital.gov.bc.ca/cloud/services/private/products-tools/artifactory/)
- **Potential impact on availability**: While Vault and Artifactory have robust failover mechanisms, their SLAs are not always align with the Gold cluster's 99.95% availability. This discrepancy can be attributed to maintenance requirements, service-specific risks, and other operational nuances
- **Mitigating downtime impact**: Applications hosted in the Gold cluster benefit from robust failover configurations that support high availability, even during temporary outages of Vault or Artifactory. By implementing strategic deployment practices—such as caching secrets, pre-pulling images and failover strategy, teams can minimize dependency on real-time access to these services, ensuring that applications remain operational throughout any service disruptions.

## SLA calculation guidance

### Factors influencing SLAs
- **Cluster type**: The base SLA varies significantly depending on whether the application is hosted on Silver, Gold, or Emerald
- **Node configuration**: Single-node vs. multi-node configurations impact the SLA due to differences in failover capabilities
- **Dependencies**: External dependencies like Vault and Artifactory influence application reliability and need to be considered in SLA calculations

### Factors that need to be considered in your SLA
To calculate the SLA for your application:
1. Start with the base SLA of your chosen cluster
2. Adjust based on the redundancy of your deployment (single-node vs. multi-node)
3. Factor in the SLAs of critical dependencies like Vault and Artifactory, considering their impact under different scenarios.

Some example approach that you can take for Application on our platform
#### Calculating Target Uptime for Applications with Dependencies**

When calculating the target uptime for applications hosted on different clusters with various dependencies, it's important to consider the impact of each dependency's availability. Below are two models to help estimate the overall availability of your applications.

**Availability Stack Model**

This model multiplies the uptime of all dependencies to estimate the overall uptime of the main application. It's useful for getting a quick understanding of how combined uptimes impact overall service availability.

Formula:
```
Target Uptime_Main_App = Uptime_Dependency_1 * Uptime_Dependency_2 * ... * Uptime_Dependency_N
```

Example:
- **Main Application**: Hosted on Gold cluster with no DR (99.5% uptime)
- **Dependency 1 (Database)**: Hosted on Gold cluster (99.9% uptime)
- **Dependency 2 (External API)**: 98% uptime

Target Uptime_Main_App = 0.995 * 0.999 * 0.98 = 0.974 (or 97.4% uptime)

### Limitations
- Assumes independence between dependencies.
- Does not account for redundancy or failover mechanisms.

**Weighted Availability Model**

This model assigns weights to each dependency based on its criticality, which is particularly useful for applications where some dependencies are more critical than others.

Steps:
1. Assign a weight to each dependency according to its importance.
2. Multiply each dependency's uptime by its weight.
3. Sum the weighted uptimes.

Example:
- **Main Application**: High availability required (e.g., hosted on the Gold cluster with DR)
- **Dependency 1 (Vault)**: 99.9% uptime (Critical, weight = 0.8)
- **Dependency 2 (Artifactory)**: Also 99.9% uptime (Medium criticality, weight = 0.5)
- **Dependency 3 (External API)**: 98% uptime (Low criticality, weight = 0.2)

```
Calculation: (0.999 * 0.8) + (0.999 * 0.5) + (0.98 * 0.2) = 0.8992 + 0.4995 + 0.196 = 0.8947 (or 89.47%)
```
Additional Considerations
- **Monitoring and Historical Data**: Review historical performance to set realistic targets.
- **Business Impact**: Evaluate the financial and operational impacts of downtime.
- **Redundancy and Failover**: Consider these mechanisms, especially for critical dependencies.


**Note**: Most applications that rely on Vault or Artifactory may continue to function even if one of these services experiences temporary downtime. This is because real-time access to these services is not typically required during their outages.

By using these methods and considering cluster-specific details, teams can better estimate the overall availability and set appropriate targets for their applications, balancing operational needs with cost-effectiveness.

## Application-specific SLOs
Develop SLOs that reflect your application's operational goals within the context of the chosen cluster's SLA:
- **Performance metrics**: Response time, throughput, error rate
- **Reliability metrics**: Uptime, failover success rate

## Monitoring and alerting
- **Monitoring**: Implement comprehensive monitoring that covers all aspects of application performance and health within the cluster environment
- **Alerting**: Set up alerts based on predefined thresholds to ensure timely responses to potential issues affecting SLA commitments

## Maintaining SLAs
- **Regular reviews**: SLAs should be reviewed and adjusted annually or after significant changes to application architecture or cluster configuration

- **Collaborators engagement**: Keep collaborators and partners informed about SLA status and any potential impacts from planned or unplanned changes

You can read more about [how to setup SRE on an application](../app-monitoring/sre-guidelines-for-platform-shared-services.md). We used the [Platform Product Registry](https://registry.developer.gov.bc.ca/) as an example for this process.

## Conclusion
Understanding the distinct characteristics and SLA implications of each cluster, as well as the dependencies on services like Vault and Artifactory, is crucial for meeting the operational requirements and reliability expectations of your applications. By following this guide, application teams can make informed decisions that align with their performance and reliability goals.


