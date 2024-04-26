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
Last updated: **April 26, 2024**

For the safety of financial transactions, the Payment Card Industry Data Security Standard (PCI-DSS) exists to govern the collection and transaction of financial records. Hosting applications collecting payment within the DevOps Platform may place the entire environment within PCI-DSS scope and governance.  The DevOps Platform was never intended to be PCI-DSS compliant.  

Ministry partners are asked to review and implement PCI-DSS compliant design patterns removing the DevOps Platform from PCI-DSS scope.

Credit card payments should be processed by OpenShift hosted applications through PayBC, so as not to introduce PCI-DSS requirements on the platform itself.

Alternatively, ministries may host their own PCI-DSS proxy service for connection to the credit card processor.

## On this page
- **[Direct sale with PayBC overview](#direct-sale-with-paybc-overview)**

---
## Direct sale with PayBC overview

PayBC portal offers a comprehensive card payment solution where businesses and citizens can come query their invoices (in CFS or on the onboarding partners platform), select an invoice to pay, go through the checkout process, make a payment and print receipts. Payment information is sent back to the application where receivables exists. 

Direct sale is a new offering of PayBC platform where external applications can use PayBC to process a credit card fund capture against a receivable transaction. PayBC portal stays completely transparent to the users using the onboarding partners application. All users see is the Bambora payment applet where they enter the credit card details and confirm payment. The payment information is communicated back from PayBC to the calling application. Also, if the onboarding ministry is in the BCGOV ledger, PayBC would also post the accounting in the CFS BCGOV ledger for revenue and cash. 

Please connect with the PayBC team for specifics.  https://pay.gov.bc.ca/faq#paybc-help

## Related pages

* [Security best practices for apps](../security-and-privacy-compliance/security-best-practices-for-apps.md)
* [Platform security compliance](../security-and-privacy-compliance/platform-security-compliance.md)
* [OpenShift platform security tools](../security-and-privacy-compliance/platform-security-tools.md)
