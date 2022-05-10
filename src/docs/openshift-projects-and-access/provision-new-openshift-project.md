---
title: Provision a new OpenShift project

slug: provision-new-openshift-project

description: Describes how to get a new project approved and provisioned in OpenShift

keywords: OpenShift, approvals, Platform Services

page_purpose: Describes the acceptance criteria to provision a new project on the OpenShift platform and the process to get the project setup.

audience: technical lead

author: Jonathan Bond

content_owner: Olena Mitovska

sort_order: 1
---

# Provision a new OpenShift project

On the OpenShift platform, different teams organize their work in isolated projects. Before you can work on the platform, you need to submit a project provisioning request to have a set of projects provisioned by the OCIO Enterprise DevOps branch.

Each new request must be reviewed and approved, including requests for additional projects from teams that already have one or more projects on the platform.

## Submit a project provisioning request

If you meet the criteria, book an onboarding meeting with the BC Gov Private Cloud PaaS product director to confirm your project's suitability, by contacting the Platform Services team at [PlatformServicesTeam@gov.bc.ca](mailto:PlatformServicesTeam@gov.bc.ca). After the alignment meeting, your product owner or your ministry's DevOps chapter lead can submit a project provisioning request through the [Platform Project Registry](https://registry.developer.gov.bc.ca/public-landing). Once your request is approved, the project is created and the requestor is notified when provisioning is complete.

**Note**: The onboarding meeting with the platform product director is a prerequisite to having a project provisioning request approved.

**For Attorney General (AG) teams only**: Contact Ryan Loiselle at Ryan.Loiselle@gov.bc.ca to submit the request for you.

OpenShift namespaces are auto-generated at provisioning in the form of `<generated alphanumeric string>-<environment>`. We call them `project license plates`.

While you wait for the alignment meeting, check out our [OnBoarding Guide for BC Gov DevOps Platform](https://docs.google.com/presentation/d/1UcT0b2YTPki_o0et9ZCLKv8vF19eYakJQitU85TAeD4/edit?usp=sharing) to learn about the available services and the easier way to integrate with the platform community.

---
Related links:
* [Platform Project Registry](https://registry.developer.gov.bc.ca/public-landing)
* [OnBoarding Guide for BC Gov DevOps Platform](https://docs.google.com/presentation/d/1UcT0b2YTPki_o0et9ZCLKv8vF19eYakJQitU85TAeD4/edit?usp=sharing)

Rewrite sources:
* https://developer.gov.bc.ca/Getting-Started-on-the-DevOps-Platform/How-to-Request-a-New-OpenShift-Project
---
