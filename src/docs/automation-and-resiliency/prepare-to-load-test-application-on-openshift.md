---
title: Prepare to load test an application on OpenShift

slug: prepare-to-load-test-application-on-openshift

description:  Describe what to do before you load test an application

keywords: application profiling, profiling, network traffic, bandwidth, resiliency, HA, high availability, failover, testing, guidelines, silver, gold, OpenShift, load test, application

page_purpose: Describes the steps needed to load test an application in OpenShift. Provides further information on what developers need to do before and to schedule a test.

audience: developer

author: Jonathan Bond

content_owner: Cailey Jones

sort_order: 7
---

# Prepare to load test an application on OpenShift
Follow these guidelines to load test ministry applications hosted in the Silver and Gold cluster of the OpenShift 4 platform.

## Load testing requirements

As OpenShift is a shared platform, the Platform Services team wants to make sure you're successful when you load test your application. You have to meet all the following requirements:

1. The test must take place after 5:30 pm on a weekday.
1. The maximum number of **concurrent sessions** during load testing must be restricted to 40,000.
1. There must be a Platform Operations team member present during the test.

The first two requirements help make sure that the test doesn't create any negative impacts on the operation of other applications running in the cluster. Following these requirements helps avoid unexpected outcomes.

**Note**: The Silver cluster of the OpenShift 4 platform includes six router nodes which together can handle 60,000 concurrent active connections. Browsers and other clients usually hold a connection open for some time and make multiple requests in the same connection or use a long running connection for things like websockets. To keep the cluster stable and healthy, only two-thirds of the overall routing capacity can be targeted by the application load test.

Having a Platform Operations team member present benefits your team and the platform. The Platform Services team wants keep an eye on the platform during the test so they can react in case the test causes a negative impact on the operation of the OpenShift cluster, platform services or other applications hosted in that cluster.

The product team running the test **must** have a team member with administrator access to the project namespaces available during the test.

## Get your test approved
You need to do the following before you can perform your load test:
1. Create a load test plan
1. Schedule the load test

### Create a load test plan
Before you perform your load test, create a load test plan. The load test plan outlines:
- The duration of the test and the weekday you want to run the test.
- The application namespaces you plan on targeting (for example, production only or both test and production).
- The ramp up time and speed.
- What constitutes a success or failure of the test (for example, response time under two seconds at all times, less than 10% errors in the response,  or more).
- The origin of generated traffic (for example, outside of the B.C. government network or internally).
- Whether application relies on anything off cluster (for example, a backend database in ZoneB or an external API that is called out to)
- Include any other relevant information you feel the Platform Services team should have

Submitting a comprehensive test plan that includes this information as part of your request to run a load test increases your chance that your request is approved quickly.

### Schedule the load test
The Platform Services team reviews your test to ensure it meets the requirements and also confirms that no other product team has a load test scheduled at the same time.

Contact the Platform Services team at [PlatformServicesTeam@gov.bc.ca](mailto:PlatformServicesTeam@gov.bc.ca) to submit your request to schedule your load test.
