---
title: Privacy Compliance and Guidance

slug: privacy-compliance-and-guidance

description: Learn about DevOps privacy considerations and tools on the B.C. Government OpenShift Private Cloud Platform as a Service.

keywords: security, privacy, private, personal, information, pia

page_purpose: This page describes the various privacy practices for platform development teams

audience: developer, technical lead

author: Blake Speers

content_owner: Nick Corcoran

sort_order: 1
---

# Privacy Compliance and Guidance

## Intro

Privacy compliance means meeting our legislative (law) requirements and privacy policy. Privacy protections also go beyond compliance and are necessary for building trust with employees, contractors, and clients. 

Users need to feel that their tools properly protect their privacy rights. A recent survey by the Privacy Commissioner of Canada reflected that more than 90% of Canadians are concerned about the collection, use, and protection of their personal information https://www.priv.gc.ca/en/opc-actions-and-decisions/research/explore-privacy-research/2023/por_ca_2022-23/. More than 70% of Canadians make decisions about what applications to use based on privacy considerations. There are also many unique privacy concerns for cloud tools that are not necessarily the same as those for non-cloud. In many cases, having support from your ministry privacy team and the Digital Office privacy analysts will be essential in addressing these unique privacy concerns.
OpenShift Internal Privacy Compliance

A Privacy Impact Assessment (PIA) was completed for Red Hat OpenShift during the development of the platform. Additional assessments are completed by the Digital Office as needed when changes to the platform impact the use, disclosure, or collection of information.

The Digital Office only collects personal information necessary for the purpose of providing our services, and for developing improvements to that service. Individual programs determine what information they want to sit on the OpenShift platform.

It is important to note that the Digital Office’s privacy assessment work only applies to our provision of services. Programs must complete their own assessment of individual programs or services they provide using OpenShift or any other platform.

## Application Privacy Compliance (including PIAs)

By law, every “public body” or Ministry is required to complete their own privacy assessments attuned to their unique needs. Because it is up to you to decide what info you need and why, your program must be responsible for assuring appropriate privacy compliance, utilizing tools and resources provided by the OpenShift service.

Depending on what you want to do on OpenShift, you may need a full PIA, or just a privacy assessment. You may need simple or more stringent controls, and you may have a need for very specific types of data that other teams do not. It is up to your Ministry Privacy team (through the Ministry Privacy Officer (MPO) - https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/privacy/resources/privacy-officers) to work with you and decide what kinds of assessments you need, whether a PIA is needed, and what that PIA should focus on for your individual project. 
It is also recommended that you contact the Digital Office’s privacy and security office - mailto:cloud.securityprivacy@gov.bc.ca?subject=Cloud%20services%20privacy%20question: for advice as we may have time-saving resources, up-to-date guidance, and contact information that can help you on your privacy compliance journey. Check in on privacy early, as your MPO and the Digital Office privacy analyst can help avoid common privacy pitfalls, help reduce the work needed on any PIAs, and help determine if there is even personal information in your initiative in the first place!

## Determining Personal Information

Because personal information (PI) is all about context, it is not possible to develop a conclusive list of data elements that are always going to be PI. Not all PI is equally sensitive, either, which is why privacy assessments are so important. In one context, someone’s hometown may be fairly innocuous, while in another, such details might reveal other sensitive, highly protected information. By law, all PI collection must also have a clear purpose, even if the info isn’t very sensitive.

Sometimes what is personal information isn’t obvious. For example, a contractor’s email may be defined as “business contact” information, even if they also use that account for personal matters, whereas their profile picture, their recorded voice in staff meetings, or their bio and background may be personal information. It’s all about context. You will want to work with your privacy teams to help work out what kinds of information you need and how much of that is actually PI.

Contact your MPO or the Digital Office privacy team cloud.securityprivacy@gov.bc.ca for guidance on determining what PI elements you actually need, and to examine the sensitivity of this information.

## Private projects

OpenShift code is open by default. However, you have the option to request a private repository for your OpenShift project in GitHub. However, this arrangement can only be temporary. You must have a plan to eventually move your project to a public repository.

Learn more about working in the open with GitHub - https://digital.gov.bc.ca/cloud/private/onboard/#set.

## Security and privacy tools

You are responsible for ensuring that your application meets security and privacy standards. There are several tools available in OpenShift - https://digital.gov.bc.ca/cloud/private/products-tools/#tools that you can use to identify vulnerabilities and keep your applications secure.

We also provide a large collection of design patterns on the platform that follow security best practices. You can use these patterns to build secure integrations between your OpenShift applications and external systems. To learn more about design patterns, post a question in the #devops-how-to Rocket.Chat channel.
