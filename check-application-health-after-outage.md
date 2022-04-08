---
title: Check application health after an outage

description: Describes aspects of your application you can check to ensure they're up and running after an outage.

keywords: openshift, devops, outage, recovery

page purpose: Gives guidelines on what to check on in an application if there has a platform-wide outage.

audience: developer

author: Jonathan Bond

content owner: Cailey Jones
---

# Post-Outage Application Checklist

One of the benefits of the OpenShift platform is a greatly reduced chance of significant unexpected outages and the near-elimination of scheduled outages. The platform is adaptable and recoverable in a way that legacy architecture is not and this lets the platform recover from hardware issues invisibly in many cases.

Still, it's always possible that an outage affects the platform and brings down the applications hosted there.

If this happens, speedy recovery is important. Use these guidelines to ensure your application recovers quickly and effectively.

## Check reporting channels

If there is a platform-wide outage, check the following sources for more information:

- RocketChat channels `#devops-alerts`, `#devops-sos` and `#devops-operations`

- Off-site [status page](https://status.developer.gov.bc.ca), if you can't access RocketChat

The Platform Services team keeps the community informed about the status of the outage. While the outage is in progress, there isn't much the team can do. Review the status and stay ready for the outage to end.

## Check your application

When the outage recovers, it's likely that everything recovers on its own, due to the resiliency of the applications.

However, you can check the following to make sure everything is working as expected:

### Connect to your application

Connect to your application to see if it's up and running. If an initial check of the functionality shows that it's working as intended, then there's nothing more for you to do, though you can continue further checks if you want.

### Check your pods

Your pods will likely scale back up on their own. However, it's still a good idea to ensure that this has occurred as expected.

- If it hasn't, this may indicate a problem with your deployment-config or with your health checks.

- If you're having problems connecting to your application and your pods look healthy, restart them. If that works, that indicates that you may need to build a more complex and robust health check for those pods.

#### Crash Loop Backoff
This error usually indicates a problem with your application: it's repeatedly attempting to boot and failing.

Your application logs should have more information and may provide further information about how to fix this issue.

#### Image Pull Backoff
This error generally indicates that the pod is having trouble getting to the image it needs to spin up.

This is usually an indication that there is still a problem with the cluster (check RocketChat or the status page) or with your image (check that it still exists and hasn't been corrupted).

You can start by trying to rebuild your image.

### Check routes status

Routes are static and it's not easy to check their status since they don't come up or go down.

However, you should check that they're working and connecting to your pods after an outage to make sure there are no residual network issues.

If your route exists but can't connect to a container, even though the container is present and working, you can try to delete the pod and force it to recover.

### Jenkins

Jenkins isn't part of the core application you're likely to be running and often gets missed after an outage.

Run a test pipeline through Jenkins to make sure everything works as expected and you don't get caught with a problem pipeline once you start updating your app again.

If you have problems with your Jenkins installation, delete the slave pods and allow them to restart, then try again.

### rabbitMQ

If you're running rabbitMQ as part of your application, you may need to restart it in case the outage caused network issues.

## Keep track of recovery steps

Create an issue template in GitHub for your application that details what you need to check to ensure that your application is up and running after an outage.

Use the GitHub template below.

```
---
name: Application Recovery Checklist
title: 'Application Recovery Checklist [DATE]'
labels: high-priority
assignees: caggles, ShellyXueHan
---
## Deployments
- [ ] Rocketchat pods (minimum 3) are up and communicating with the database.
- [ ] Jenkins pods have been restarted.
- [ ] BCBot has been restarted.
## Stateful Sets
- [ ] MongoDB pods are up, running, communicating with each other and with the application.
## Routes
- [ ] Is Rocketchat Prod available through it's normal route?
- [ ] Fix route to re-point to the production instance if we've swapped over to the maintenace instance during this outage.
## Backups
- [ ] Manually run the recovery test script to make sure that the most recent backup is working.
- [ ] Ensure that next scheduled backup occurs as expected.
```

---
Rewrite sources:
* https://github.com/BCDevOps/developer-experience/blob/master/docs/post-outage-checklist.md
---
