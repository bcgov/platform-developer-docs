---
title: Build an Application

slug: build-an-application

description: <TBD>

keywords: build, application, openshift, hardening, security, SAST, DAST, PaaS, Risk Mitigation, 

page_purpose: 

audience: technical lead, developer

author: Kevin Summersill

content_owner: 

sort_order: 
---
# Build an Application
This documenation identify the following:
*   Best Practices when working with Images
*   Security Best Practices to utilize Before, During, and After pushing to production. 

- [Build an Application](#build-an-application)
  * [Minimizing Server Image Surface Area](#minimizing-server-image-surface-area)
    + [What are bloated images?](#what-are-bloated-images-)
    + [What are the reasons to reduce image bloat?](#what-are-the-reasons-to-reduce-image-bloat-)
    + [Best Practices for Reducing Image Bloat:](#best-practices-for-reducing-image-bloat-)
  * [Shifting Left and Mitigating Risk](#shifting-left-and-mitigating-risk)
    + [So what is .devcontainer?](#so-what-is-devcontainer-)
    + [Best Practices for .devcontainer:](#best-practices-for-devcontainer-)
  * [Testing the Server-Based Images](#testing-the-server-based-images)
  * [Securing and Hardening Images](#securing-and-hardening-images)
  * [Integrating Security in the Pipelines with Best Practices](#integrating-security-in-the-pipelines-with-best-practices)
  * [Utilizing Semantic Versioning with Images](#utilizing-semantic-versioning-with-images)

## Minimizing Server Image Surface Area ## 
There are multiple benefits of trimming the fat from images before deploying them into the Platform as a Service. This section of the documentation will cover these benefits:

### What are bloated images? ###
A bloated image is an image that contains increased amounts of unnecessary items which are not needed to run the application. Examples of unnecessary items are packages, binaries, and libraries that may be installed or on the image that are not being used. 
### What are the reasons to reduce image bloat? ###
*   Packages, Libraries, and binaries that are not tracked or managed within the image can cause security risks. 
*   The increased image size can cause the start time of images to increase when immutable. For example, when images are immutable and set up in a stateless manner they may be rescheduled to nodes. If the image pull policy is set up to “If Present” or set up to “Always” then the image will need to be reloaded. This could potentially increase the amount of time that it takes for the service to be available. 
### Best Practices for Reducing Image Bloat: ###
*   Utilizing Universal Binary Images or Minimal Based Images 
*   When building utilizing Multi-Stage Images and removing building tools. (e.g. Java Development Kit)
*   Reducing the number of image layers. For example, consolidate RUN states with &&.

## Shifting Left and Mitigating Risk ##
Shifting Left with Images using .devcontainer
If not already known to shift left is the process of replicating production environments as far left helping to therefore mitigate risk. One of the best ways to implement this process is by implementing .devcontainer. 
### So what is .devcontainer? ###
This is a development solution provided within Visual Studio Code (VSCode) which allows developers to utilize an image with a set of tools without installing them on the actual machine. VSCode utilizes the Remote Development Extension to read the .devcontainer folder and the devcontainer.json to set up an environment to develop within the image. 
### Best Practices for .devcontainer: ###
*   Setup a standard set of tools and development binaries for developing the application.
*   Utilize the same image within pipelines. (e.g., Tekton)

## Testing the Server-Based Images ##
Another part besides removing image bloat is to mitigate risk far left. A way to do this is to deploy an application into the same image that would be utilized in production within the Platform as a Service (PaaS).  

## Securing and Hardening Images ##
Application security is consistently evolving and with that comes a need to continuously monitor the images for Common Vulnerabilities and Exposures (CVE)s. An example of this is Log4j producing a Zero-day attack. This section will list some best practices and concepts that can be taken far left prior o pushing into the PaaS:
*   Utilizing Image scanning tools to prevent Critical, High, Medium, and Low vulnerabilities from being introduced into production. 
*   Minimize Image Surface Area (as mentioned in the previous section)
*   Utilize non-root-based users when the containers run the image. 
*   Setup Group Ownership and File permissions of the non-root user
*   Include the latest security updates within the base image being used
*   Utilized license information within the images for verification
*   Identify Supply Chain attacks against dependencies within applications. 
*   Utilized Signed Images Only to mitigate the risk of compromise

## Integrating Security in the Pipelines with Best Practices ##
When time is not a virtue then automation becomes a best friend. The security risk becomes far created with the delivery speed increasing and the time to production decreases. However, security risks can be avoided by applying the correct threshold checks in places to automate activities and remove toil. This section will identify some best practices when working with pipelines:
*   Utilize the Open Container Initiative (OCI) format to export and scan for vulnerabilities. 
*   Utilized Minimum Server Based Images to remove the amount to scan. 
*   Run tools to scan for vulnerabilities missing best practices. (e.g. KICS) 
*   Scan the Application using Static Application Security Testing tools before building the image. 
*   Run Dynamic Application Security Testing (DAST) to test for penetration vulnerabilities (DAST).

## Utilizing Semantic Versioning with Images ##
As the team increased velocity and delivery the capability of setting up standard version control becomes harder. Semantic Version allows for additional metadata that is sometimes overlooked that can be used for images. The semantic number contains the following structure:
1.0.2-beta.1+meta
*   Major – Usually identifies a major change in delivery. 
*   Minor – Identifies a new feature or less than Major but more than patch changes. 
*   Patch – Identifies a very simple change. 
*   Beta.1 – Identifies a new Pre-Release and can be updated injunction with Major, Minor, and Patch. 
*   Meta – This can include any metadata. (e.g., Git Commit Number). 
The additional number structure can allow the capability to set up pipelines and other automation tasks to quickly keep track of image changes when speed increases. 

## Think Stateless at the Start ##
Stateless should be the first thing to think about when working with any Container Orchestrated environment such as OpenShift. The Platform as a Service (PaaS) recommended approach is Stateless, which will help allow the performance to drastically increase. OpenShift runs much slower when it must reference metadata to determine the Statefullness of an application. Therefore to increase speed for all applications it is recommended for Stateless. However, this cannot always be the case but should be a first approach to consider. 
Stateless is a term used when an application does not care about the node that is running it. 
Immutable reference that the images are self-constained with all the instructions it needs to run is within the image itself.
Below is some information to consider when working with Stateless: 
*   Attempt to avoid using sessions that can increase a load of complexity to the container and application. 
*   Stateless scales horizontally with ease compared to Stateful
*   Stateless apps can run on cache and run a lot faster than associating Persistent Storage.
*   A Stateless application may require less storage to run the application. 
*   Very easy to decouple and connect to additional micro-services.  
