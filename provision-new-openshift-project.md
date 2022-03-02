---
  title: Provision a new OpenShift project

  description: Describes how to get a new project approved and provisioned in OpenShift

  keywords: OpenShift, approvals, Platform Services

  page purpose: Describes the acceptance criteria to provision a new project on the OpenShift platform and the process to get the project setup.

  audience:
---

# Provision a new OpenShift project

On the OpenShift platform, different teams organize their work in isolated projects. Before you can work on the platform, you need to submit a project provisioning request to have a set of projects provisioned by the OCIO Enterprise DevOps branch.

Each new request must be reviewed and approved, including requests for additional projects from teams that already have one or more projects on the platform.

## Acceptance criteria

The OCIO Platform Services team needs to be confident you meet the following criteria before they agree to host your project on the OpenShift platform:

* Your executive sponsors and endorses the project and the continuous service improvement <!-- Does this refer to the ITIL concept: Continual Service Improvement? If so, proper noun, capitalize, etc.--> delivery model
* Your project is based on open-source code, with custom code hosted in the [BC Government GitHub repositories](https://github.com/bcgov)
* Your project is supported by a team with explicit roles such as devops specialist, scrum master and product owner. Ideally, one or more of these roles should be filled by dedicated staff
* Your team follows an Agile methodology
* Your team is committed to participating in and contributing to the BC Government open-development community  
* You have a devops specialist looking after your application after you complete the period of active development

## Submit a project provisioning request

If you meet the criteria, book an alignment meeting with the product director on the Platform Services team to confirm your project's suitability<!-- this originally had Olena's contact, but we should replace it with something more generic. Is there contact info for this request? -->. After the alignment meeting, your product owner or your Ministry's devops champion can submit a project provisioning request through the [OpenShift 4 Project Registry](https://registry.developer.gov.bc.ca/public-landing). Once your request(s) are approved, the project is created and the requestor is notified when provisioning is complete.

**For AG teams only**: Contact Ryan Loiselle at Ryan.Loiselle@gov.bc.ca to submit the request for you. <!-- same as above? Is there a generic alt for this? -->


OpenShift namespaces are auto-generated at provisioning in the form of `<generated alphanumeric string>-<environment>`. We call them `project license plates`.

While you wait for the alignment meeting, check out our [OnBoarding Guide for BC Gov DevOps Platform](https://docs.google.com/presentation/d/1UcT0b2YTPki_o0et9ZCLKv8vF19eYakJQitU85TAeD4/edit?usp=sharing) to learn about the available services and the easier way to integrate with the Platform Community.

---
Rewrite sources:
* https://developer.gov.bc.ca/Getting-Started-on-the-DevOps-Platform/How-to-Request-a-New-OpenShift-Project
---
