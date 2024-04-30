---
title: Payment card processing for OpenShift applications

slug: payment-card-processing

description: How to use centralized payment card processing for OpenShift applications

keywords: openshift, pci-dss, pci, payment, processing, paybc, project, devops 

page_purpose: Guides application teams through the process and considerations around accepting payment through their applications 

audience: developer, technical lead, product owner

author: Nick Corcoran 

content_owner: Nick Corcoran 

sort_order: 5
---
# Payment card processing for OpenShift applications
Last updated: **April 30, 2024**

The Payment Card Industry Data Security Standard (PCI-DSS) exists to govern the collection and transaction of financial records for the safety of financial transactions. Hosting applications that collect payment within the DevOps Platform may place the entire environment within PCI-DSS scope and governance. The DevOps Platform was never intended to be PCI-DSS compliant. We ask ministry partners to review and implement PCI-DSS compliant design patterns to remove the DevOps Platform from PCI-DSS scope.

To avoid introducing PCI-DSS requirements on the platform itself, OpenShift hosted applications should process credit card payments through PayBC. Alternatively, ministries may host their own PCI-DSS proxy service for connection to the credit card processor.

## Direct sale with PayBC overview

The PayBC portal provides a comprehensive card payment solution, allowing businesses and citizens to query their invoices (in CFS or on the onboarding partner's platform), select an invoice to pay, go through the checkout process, make a payment, and print receipts. The application sends payment information back to where receivables exist.

The PayBC platform now offers Direct Sale, allowing external applications to utilize PayBC for processing credit card fund captures against receivable transactions. The PayBC portal remains completely transparent to users accessing it through the onboarding partner's application. All users interact solely with the Bambora payment applet, where they input credit card details and confirm payment. Payment information is then communicated back from PayBC to the calling application. Additionally, if the onboarding ministry is in the BCGOV ledger, PayBC also posts the accounting in the Corporate Financial System (CFS) BCGOV ledger for revenue and cash.

For more detailed information [connect directly with the PayBC team](https://pay.gov.bc.ca/faq#paybc-help).

## Related pages

* [Security best practices for apps](../security-and-privacy-compliance/security-best-practices-for-apps.md)
* [Platform security compliance](../security-and-privacy-compliance/platform-security-compliance.md)
* [OpenShift platform security tools](../security-and-privacy-compliance/platform-security-tools.md)
