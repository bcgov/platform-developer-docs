---
  title: Prepare to load test an application on OpenShift

  description:  Describe what to do before you load test an application

  keywords: application profiling, profiling, network traffic, bandwidth, resiliency, HA, high availability, failover, testing, guidelines, silver, gold, OpenShift, load test, application

  page purpose: Describes the steps needed to load test an application in OpenShift. Provides further information on what developers need to do before and to schedule a test.

  audience: developer

  author: Jonathan Bond

  content owner: Cailey Jones
---
# Prepare to load test an application on OpenShift
Follow these guidelines to load test ministry applications hosted in the Silver and Gold cluster of the OpenShift 4 platform.

## Requirements

As OpenShift is a shared platform, the Platform Services team wants to make sure you're successful when you load test your application. You have to meet all the following requirements:

1. The test must take place after 5:30pm on a weekday
1. The maximum number of **concurrent sessions** during load testing must be restricted to 40,000
1. There must be a Platform Team member present during the test

The first two requirements help make sure that the test doesn't create any unnecessary impact on other applications running on the cluster.

It's unlikely this will cause issues. OpenShift isolates each namespace effectively, though there can be unexpected outcomes to some tests which impact other shared services.

Following these requirements helps avoid unexpected outcomes.

**Note**: The Silver cluster of OpenShift 4 Platform includes 6 router nodes which together can handle 60,000 concurrent active connections. Browsers and other clients usually hold a connection open for some time and make multiple requests in the same connection or use a long running connection for things like websockets. To keep the cluster stable and healthy, only two-thirds of the overall routing capacity can be targeted by the application load test.

Having a Platform Services team member present benefits your team and the platform. The Platform Services team wants keep an eye on the platform during the test so they can react in case the test causes something unexpected to shared services.

The team wants to have someone present to provide support during the test and in case you need someone with elevated privileges on the platform.

The team also wants to make sure several teams aren't performing load tests at the same time.

## Get your test approved
You need to do the following before you can perform your load test:
- Create a load test plan
- Schedule the load test

### Create a load test plan
Before you perform your load test, create a load test plan. The load test plan outlines the following:
- Duration of the test and the weekday you want to run the test
- Application namespaces you plan on targeting (for example, production only or both test and production)
- Ramp up time and speed
- What constitutes a success or failure of the test (for example, response time under two seconds at all times, less than 10% errors in the response,  or more)
- Origin of generated traffic (for example, outside of the BC Government network or internally)
- Whether application relies on anything off cluster (for example, a backend database in ZoneB or an external API that is called out to)
- Include any other relevant information you feel the Platform Services Team should have

Providing the team a comprehensive test plan that includes this information increases your chances that the team approves it quickly.

### Schedule the load test
The team needs to review your load test plan to make sure they have all the information required for the test. The team also has to make sure a team member is available during the time you want to do the test. If there are any alterations to the time and date or plan itself, the team works with you to sort it out.

Contact [@olena.mitovska](https://chat.developer.gov.bc.ca/direct/olena.mitovska) in RocketChat to start scheduling your load test.
---
Rewrite sources:
* https://github.com/bcgov/platform-developer-docs/tree/review-technical-docs
---
