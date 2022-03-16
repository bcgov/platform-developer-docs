---
title: Artifactory project and quota increase requests

description: Describes statuses when a user makes a project or quota increase request

keywords: Archeobot, Artifactory, images, artifact, best practices, Artifactory management, repositories, projects, service account

page purpose: Discusses the different statuses a user might see if they've requested a quota increase or new project

audience: technical lead, developer

author: Jonathan Bond

content owner: Cailey Jones
---
# Artifactory project and quota increase requests

If you've made a request for a new Artifactory project or quota increase and it was rejected, reach out to the Platform Services team to ask why. If you think your request was rejected in error, let the team know. If the request should have been approved, they'll switch the status to `approved` and you'll see the changes applied.

If the team maintains the rejection, make sure you acknowledge the rejection. If you don't, further change requests are ignored. Acknowledge the rejection by changing your Artifactory projectProject object back to the state it was in before you made the request.
* If you requested a new project, delete the ArtifactoryProject object from your namespace.
* If you requested an increased quota, change the quota in the spec of your ArtifactoryProject back to the currentquota of your project. If you're not sure what the quota is, check the Overview page for your project in the Artifactory web GUI.

After you've made the change, Archeobot reconciles once more and you'll see that your `approval_status` changes back to `nothing-to-approve` (or you will have deleted the ArtifactoryProject object, in which case you won't see anything at all). This means your rejection has been acknowledged and you can make further change requests.

---
Rewrite sources:
* https://github.com/BCDevOps/developer-experience/blob/master/apps/artifactory/DEVHUB-README.md
---
