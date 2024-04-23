# SRE reference for application deployment across different clusters
Last updated: **April 17, 2024**

This document guides application teams deploying applications across different hosting clusters managed by our platform. Each cluster has unique characteristics and Service Level Agreements or SLAs, which should be understood and considered when planning deployment and setting reliability targets

## Clusters overview
- **Silver Cluster**: Designed for cost-efficiency and suitable for less critical applications
- **Gold Cluster**: Offers higher resilience and is intended for business-critical applications that require robust failover mechanisms
- **Emerald Cluster**: Tailored for applications requiring enhanced security features, specifically for Protect C project applications

## SLA expectations per cluster
For detailed SLA expectations per cluster, please refer to the official [Hosting tiers SLA documentation](https://digital.gov.bc.ca/cloud/services/private/products-tools/hosting-tiers/).

## Impact of Vault and Artifactory on application availability
Vault and Artifactory are crucial components hosted on the Gold cluster, used for secret management and as a image repository manager, respectively. The availability and performance of these services can directly impact the applications depending on them. However, it's important to note:

- **SLA for Vault and Artifactory**: Detailed SLA information for these services can be found here:
  - [Vault SLA Details](https://digital.gov.bc.ca/cloud/services/private/products-tools/vault/)
  - [Artifactory SLA Details](https://digital.gov.bc.ca/cloud/services/private/products-tools/artifactory/)
- **Potential impact on availability**: While Vault and Artifactory have robust failover mechanisms, their SLAs are not always align with the Gold cluster's 99.95% availability. This discrepancy can be attributed to maintenance requirements, service-specific risks, and other operational nuances
- **Mitigating downtime impact**: Applications in the Gold cluster with failover settings are designed to maintain high availability, even if Vault or Artifactory is temporarily unavailable. By correctly configuring application deployments (e.g., caching secrets or pre-pulling images), teams can ensure that their applications remain operational without needing real-time access to these services during outages

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

You can read more about how to setup SRE on an application here

## Conclusion
Understanding the distinct characteristics and SLA implications of each cluster, as well as the dependencies on services like Vault and Artifactory, is crucial for meeting the operational requirements and reliability expectations of your applications. By following this guide, application teams can make informed decisions that align with their performance and reliability goals.


