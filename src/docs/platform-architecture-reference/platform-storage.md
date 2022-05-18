---
title: Platform storage

slug: platform-storage

description: Describes the different storage technologies used on the OpenShift platform.

keywords: netapp, net app, nfs, storage, pvc, persistent, storage options, platform storage

page_purpose: Describes different platform technologies, types, and services and their details.

audience: technical lead, developer

author: Jonathan Bond

content_owner: Olena Mitovska

sort_order: 3
---

# Platform storage

We use several different storage technologies on the OpenShift platform. Currently, we have three types of persistent storage available:

* **FILE**: File storage is an all-purpose storage type that can be attached to one or more containers. It's the recommended storage class for most general application uses and is powered by Network File System (NFS).

* **BLOCK**: Block storage offers additional performance and reliability for databases or similar workloads, but is only able to be attached to one container at a time. This is powered by iSCSI.

* **S3 Object Storage**: Object-based storage that is available via a web-based API instead of through a mounted directory. A common implementation of this is the Amazon S3 API. This allows remote access storage over the internet that does not require directly attaching to a running system.

## On this page
- [Storage services](#service)
- [Tools](#tools)
- [Storage details](#storage-details)

## Storage services<a name="service"></a>

We have access to the following storage services for the OpenShift platform.

### OpenShift Persistent Volumes (NetApp)

All NetApp storage classes support resizing (bigger only). You can start with a small volume and edit your Persisent Volume Claim (PVC) to have a larger `.spec.resources.requests.storage` later if you need more. You may need to restart the pods attached to let the resize trigger on re-mount. **Note: the storage increase is capped by the storage quota assigned to the namespace. For the current resource quota sizes, see [OpenShift project resource quotas](/openshift-project-resource-quotas/).

* **NetApp File**: `netapp-file-standard` is the default storage class for the platform and the type of storage you get if you don't specify a specific `storageClass`.

  `netapp-file-backup` is the same as `netapp-file-standard` but the contents are backed up daily by the OCIO backup infrastructure. For more information, see [Backup and Restore](https://developer.gov.bc.ca/OCP4-Backup-and-Restore).

* **NetApp Block**: `netapp-block-standard` is the current block `storageClass` target and the `storageClass` you should use for your block storage needs.

Two additional storage classes (`netapp-file-extended` and `netapp-block-extended`) aren't available to dev teams. They are reserved for operations teams to use for infrastructure components, like the ElasticSearch stack or the image registry.

### OpenShift Volume Snapshots

Snapshots can be used to maintain point-in-time copies of volumes. This empowers rapid testing by quickly resetting a PVC to a consistent state between each test run or getting an atomic view of a volume to run a backup on. Under the hood, they are very quickly created by the NetApp as a copy on write clone which means they are very space efficient.

See the [Red Hat documentation](https://access.redhat.com/documentation/en-us/red_hat_openshift_container_storage/4.7/html/deploying_and_managing_openshift_container_storage_using_red_hat_openstack_platform/volume-snapshots_osp) for how to create snapshots and how to create PVCs from those snapshots.

### S3-Compatible Object Storage (Dell EMC Elastic Cloud Storage)

For applications that need to store large amounts of unstructured data we recommend using the S3-compliant on-premises [Object Store Service](https://ssbc-client.gov.bc.ca/services/ObjectStorage/overview.htm) offered by the OCIO Enterprise Hosting branch. The Object Store Services provides storage for unstructured data such as images, PDFs and other types of files. NetApp storage offered on the OpenShift 4 Platform isn't suitable for large amounts of unstructured data. NetApp storage should only be used for structured data such as databases that require high-I/O workloads.

The OCIO has an [object store](https://ssbc-client.gov.bc.ca/services/ObjectStorage/overview.htm) service that supports the AWS S3 protocol. The service is aimed at objects typically over 100 KB, updated infrequently, retained longer term, with performance response targets of 100ms or more.

Contact your ministry IMB to get access to the ministry service account that controls access and where a bucket for your application will be provisioned.

#### Details

This service replicates data between the two datacenters and the API endpoints are load balanced between them to ensure uptime even if a datacenter goes offline.

Object Storage Service is highly fault tolerant and uses erasure coding within the cluster, as well as asynchronous replication and automatic failover to the Calgary data center. The solution also offers configurable object versioning, allowing for file recovery. Due to the high fault tolerance, versioning and redundancy, most teams don't implement additional backups. A recommended design pattern would be to replace the application's Minio storage with the direct integration with the S3 API within the Object Storage Enterprise Services.

## Tools<a name="tools"></a>

You can use tools to manage your persistent storage beyond the features built into OpenShift.

* **Database backups**: We have a community project to help teams implement regular backups of their databases hosted within the platform. The repository is called [backup-container](https://github.com/bcdevops/backup-container)

* **Migrating storage**: Another community supported repository is available to help with migrating data from one PVC to another (moving from one storageClass to another, moving to a larger PVC, etc). The repository is called [StorageMigration](https://github.com/BCDevOps/StorageMigration)

## Storage details<a name="storage-details"></a>

### Quotas
All storage sizes are in GiB and backup quotas default to half the storage size. These quotas can be requested in the [Platform Project Registry](https://registry.developer.gov.bc.ca/public-landing) by a project's product owner or technical lead.

**Note**: You must provide proof of increased storage needs to the platform product director before the request can be approved and more storage is allocated to a namespace.

All storage quotas include 60 PVCs and 5 VolumeSnapshots.

- storage-1
- storage-2
- storage-4
- storage-16
- storage-32
- storage-64
- storage-128
- storage-256
- storage-512

### Choose a storage type

If you don't have a specific need, choose **FILE**. Only choose block storage if you have a specific reason to do so, preferably only in your PROD projects.

As this is a shared platform with automatic provisioning enabled for your needs, the urge to provision "more" or "the best available" is contradictory to the best use of the platform. With resizing available on request, there should be no reason to order more than you know you need today. Don't request what you think you need, only request what you know you currently need. If those needs change, then update your storage requests.

### Minimums and maximums (NetApp storageClasses)

The minimum size is 20Mi. If it's any smaller, provisioning fails. You don't need to request a full 1Gi if you don't need it.

The maximum size is 256Gi. If it's any bigger, provisioning fails. Larger custom quotas won't get around this currently as we've set this limit to make sure NetApp can remain properly balanced.

### Performance

The speed of each storage solution depends on your workload. ElasticSearch specifically doesn't work with NFS protocol and needs block storage. If you have specific performance needs, test both types of storage with your specific workload to see which meets your needs.

### Further details

* File storage can be mounted by multiple pods at the same time. The protocol is also a bit more robust to maintenance.

* Block storage can't be mounted during maintenance. Any pods already running will failover properly to the secondary NetApp node, but any newly launched pods will fail to start until both NetApp nodes are available. We have an open case with NetApp to see if this can be improved.

* Only block volumes support snapshots.

* File storage ends up being a bit more flexible (mountable as RWX, etc), while Block storage is generally more performant for database or other small transaction/write intensive application uses.

* Object storage is great for storing large volumes of data (many terabytes) for long periods of time very cheaply. But its response time can be quite slow for retrieving individual files.

* All netapp-*-standard volumes are thin provisioned and have de-duplication and compression enabled. The de-duplication and compression jobs are currently run overnight at 00:10.

---
Related links:
* [OpenShift project resource quotas](/openshift-project-resource-quotas/)
* [Backup and Restore](https://developer.gov.bc.ca/OCP4-Backup-and-Restore)
* [Red Hat documentation](https://access.redhat.com/documentation/en-us/red_hat_openshift_container_storage/4.7/html/deploying_and_managing_openshift_container_storage_using_red_hat_openstack_platform/volume-snapshots_osp)
* [BCDevOps/Backup-Container](https://github.com/bcdevops/backup-container)
* [BCDevOps/StorageMigration](https://github.com/BCDevOps/StorageMigration)
* [Platform Project Registry](https://registry.developer.gov.bc.ca/public-landing)

Rewrite sources:
* https://github.com/BCDevOps/openshift-wiki/blob/master/docs/OCP/OCPStorageServices.md
* https://github.com/BCDevOps/OpenShift4-Migration/issues/59
* https://ssbc-client.gov.bc.ca/services/ObjectStorage/overview.htm
---
