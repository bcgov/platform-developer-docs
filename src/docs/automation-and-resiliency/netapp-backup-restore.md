---
title: Restoring Backup Volumes on OpenShift

slug: netapp-backup-restore

description: How to request the recovery of an netapp-file-backup volume

keywords: backup, restore, recovery, recover, volume, persistent, persistence

page_purpose: Provides instructions for requesting the recovery of an netapp-file-backup volume

audience: developer, technical lead

author: Cailey Jones

content_owner: Cailey Jones

sort_order: 7
---
# Restoring Backup Volumes on OpenShift

## Using `netapp-file-backup` persistent volumes

The storage class `netapp-file-backup` is backed up with the standard [OCIO Backup](https://ssbc-client.gov.bc.ca/services/AppHosting/base.htm#databackup) infrastructure:
- full backups are performed monthly
- incremental backups are performed daily
- backups are retained for 90 days.

It's the **only** storage class that is backed up - `netapp-file-standard` and `netapp-block-standard` are not.

Don't mount the `netapp-file-backup` storage class to any production workloads. It's less stable than the other two storage classes and may cause outages. You should only use `netapp-file-backup` to store backup data, preferably by mounting it to a pod controlled by a cronjob.

For more information on the storage classes, see our [Platform Storage](/platform-storage/) documentation.

## Preparing to Restore

In order to restore your persistent volume (PV), you will need to know the name of the volume. You can find the name by running the following command:

```console
$ oc get pvc
NAME           STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS           AGE
backup-test    Bound    pvc-02e9d855-cd63-480d-a1d7-9b638b04f6ff   20Gi       RWX            netapp-file-backup     3d19h
```

Save the volume name (in this example, that's `pvc-02e9d855-cd63-480d-a1d7-9b638b04f6ff`) for later in case you delete your persistent volume claim (PVC). **Make sure you get and save the volume name now. Once you're in a situation where you need the name, you won't be able to get it**.

## Restoring your Volume

If you need to restore your PV, you will need an existing `nfs-file-backup` PV on the same cluster to use as a destination for the restored data. If you don't have one already, create a new one. If you have an existing PV that you want to use as your destination, you should consider creating a special folder to use as the destination for your restored data - that way, you don't risk overwriting anything by accident.

Then, submit a [request](https://github.com/BCDevOps/devops-requests/issues/new/choose) for a restore. Provide the name of the PV you need restored, the OpenShift cluster on which it was running, the date you need restored from, and the name of the destination PV. If you want to request the recovery of only a particular folder, just include the name of the folder you want recovered. If you want the Backup team to restore your data to a particular folder on the destination PV, just provide the name of the folder (which you must already have created).

Note that recovery isn't limited to recreating a whole deleted volume. For example, if a necessary file was deleted off of your PV yesterday, you can request that the file be restored using this process: you would just specify the source and destination PV as being the same. Just make sure that you specify the folder and file of both the source and destination carefully, to avoid accidentally 'recovering' (and overwriting) the wrong data.

DXC will pass the request to our Backup team for execution and report back when completed.

Sample request:

```text
Date: June 19 2020 @2pm
Cluster: Silver
Source PV: pvc-02e9d855-cd63-480d-a1d7-9b638b04f6ff
Destination PV: pvc-6d81a45c-bd21-4f87-a855-dde9f0c512e0/2020-06-19
```

*Note: both PVC source and destination must be a netapp-file-backup PVC on the same cluster.*

## Other Options

It will take time for your data to be recovered using this process. It requires that a lot of information be passed back and forth between different teams, and there is a lot of manual work involved behind the scenes for the Platform and Backup Teams.

Consider using the OCIO S3 Object Storage service instead. With the object storage service, your team has direct access to the S3-compatible buckets that will be used as the backup destination, so there's no "middle-man" between your team and your data. You can recover from S3 immediately, whenever you want, without waiting on anyone else. Check in with your Ministry's Information Management Branch (IMB) for more information on how to get access to the OCIO Object Storage service.
