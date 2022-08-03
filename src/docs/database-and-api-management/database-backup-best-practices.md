# Database Backup Best Practices

If something bad happens to your database, you will want to recover your application's data quickly, easily, and with up-to-date data. With that goal in mind, your data recovery plan should include these three considerations:

- [Backing up your data](#backing-up-your-data)
- [Recovering your data](#recovering-your-data)
- [Monitoring your database](#monitoring-your-database)

Don't forget: **Automate Everything!** You should automate every part of your data recovery plan, as much as possible! Automation makes your data recovery plan faster and more reliable.

Once you've set up your recovery plan, you can apply it using one of the many [automated backup solutions](#automated-backup-solutions) popular on the platform. Remember that you are not required to use the ones listed here. If it suits your needs to use something else or to create your own, feel free! But remember: it's easier to ask for help if there are lots of other people using the same tool!

## Database Backup Basics

Before we dig into the details of how to create and implement your data recovery plan, we should discuss a few terms and basics.

For a quick introduction to databases in general, check out our [Open-Source Database Technologies](opensource-database-technologies.md) document. This is a great spot to get a more detailed introduction to some database-specific terminology.

### Database Dumps

Every major DBMS (database management software) comes with a **backup utility tool**. You can find the documentation for the most common DBMSes on the Openshift Platform below:
* Postgres: [pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html)
* MongoDB: [mongodump](https://www.mongodb.com/docs/database-tools/mongodump/)
* MySQL: [mysqldump](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html)

Running one of these tools will produce a file (usually called a "database dump"). This file is a stand-alone backup, and can be moved or copied safely. 

You _must_ use these utility tools for your backups. Don't try to backup your database by saving the datafiles directly. If you do, your data may become corrupted. Any trusted backup automation tool (including those mentioned in this document) will use these utility tools.

### Backup Types

A **complete backup** is a backup file which contains everything required for a database to be recovered completely from scratch. These are larger than other types of backup, but they're more reliable because they don't depend on anything but a single dump file to work.

A **delta backup** is a record of changes to the database since the last backup. Delta backups are smaller than complete backups. If you need to recover your database with a delta backup file, you'll need the most recent complete backup _and_ all of the delta backups that have taken place since. Deltas are a great way to reduce backup storage requirements. They're also very reliable as long as you can ensure the availability of the other files that would be necessary to restore your database.

## Backing Up Your Data

This first part of your data recovery plan should answer the following questions:

[ ] **What data do you want to back up?**

A good default here is "everything." If the data is important enough to keep in your database, it's important enough to back up!

In addition to your application data, you'll want to include metadata (like database user accounts, permissions and history) in your backups as well. If you're using a DBMS that allows you to create different databases in the same instance (like Postgres), you should include all the databases in your backup. 

Most database backup utilities default to backing up everything in your database instance. 

[ ] **How often you want to back up your data?**

A common default here is 'daily'. Most teams run database backups once per day.

A database failure is considered catastrophic if all the files related to the database become corrupted or otherwise unavailable. In such an event, you would need to recover your data from your most recent backup. This means that it's possible to lose all data more recent than your most recent backup. However, a failure of this severity is very rare.

A much more common type of database failure involves the partial corruption or loss of data. In such an event, you can recover from your data from your most recent backup. Then, you may be able to make use of a feature called "point-in-time recovery." Most DBMSes maintain local delta files to keep a history of database changes since the last backup. As long as these files remain intact, they can be used to recover your database to a point in time more recent than your last backup. The details of point-in-time recovery features vary depending on your DBMS. You can find more specifics in the documentation for your DBMS.

More frequent backups will reduce the risk of data loss, but will increase costs. Running backups requires considerable CPU and memory. Keeping more dump files will require more storage. It is up to your team to balance this risk vs cost appropriately for your application.

You should also consider how often you'll perform a complete backup versus a delta backup. Most teams run delta backups every night, and one complete backup per week (usually run on the weekend). If you use this approach, recovering your database will require the complete backup from the weekend, plus each of the delta backups that have run since. In other words, you would need one complete backup file and up to six delta backup files.

It might seem like a good idea to just skip delta backups entirely, and to run only complete backups. This would increase your storage requirements significantly. Your backups would also take much longer to run. You can trust your delta backups as long as you store them safely and schedule them correctly. These are both topics that we will discuss in the next two questions!

[ ] **Where will the backups be stored?**

Most teams on the Openshift platform choose between two common defaults: an `nfs-file-backup` PVC (persistent volume claim), or an S3 bucket. You can find out more in 

You should always store backup files in multiple physical locations. If some major catastrophe were to impact the physical space that houses the Openshift cluster (like a fire or flood), you will still be able to recover your data because you have made sure to store copies of your backups in another location.

You should also make sure that your backups can be accessed as quickly as possible. If your database is corrupted or unavailable, your application is suffering a full or partial outage. The longer it takes your team to recover your data, the longer the outage will be.

You should also consider costs and overhead that might be associated with your backup storage solution, and balance these against the risks mentioned above.

The `nfs-file-backup` PVCs are backed up the storage administrators, and these backups are stored off-site. Recovering from a backup stored on an `nfs-file-backup` PVC is usually very fast, since the backups remain on the cluster. However, if you were unable to access the `nfs-file-backup` PVC (due to a significant problem with your namespace or the entire cluster), recovering from these off-site backups requires that you make a request to the storage administrators. This would increase your recovery time significantly. The `nfs-file-backup` PVCs are more expensive than S3 storage, but are easier to set-up.

Your team should already have access to the `nfs-file-backup` storage option. All teams working on Openshift automatically have access to PVCs of this type.

The BC Government's S3 storage service is highly available and has disaster recovery features that are managed by its administrators. If you use an S3 bucket, you do not need to worry about off-site backups or restoring from off-site backups, as all of this is done for you. In the event of a major problem with the main S3 storage site, the software will recover automatically to another site with little-to-no downtime. This means that your backups will be easily accessible to you, even in the event of a major outage. However, because the backups are not stored on-cluster, they are vulnerable to network issues. S3 storage is much cheaper than `nfs-file-backup`, but is also more complex to set up.

In order to provision an S3 bucket for your team, you should contact your ministry's DevOps support team. Each ministry has its own process for provisioning access to the S3 object storage service. You can ask further questions on the #object-storage channel on RocketChat.

[ ] **How many backup files will you keep?**

Most teams retain their backup files based on a schedule. Let's consider a team running database backups once per day. They might use a schedule that looks like this:
- Daily Backups: 6
- Weekly Backups: 4
- Monthly Backups: 3

This means that they are keeping every one of their nightly backups for the past week. These daily backups are probably delta backups. They also retain one complete backup from each week for the past four weeks, and one complete backup from each month for the last three months. 

The schedule above is very similar to the default schedule found in the shared [backup-container](https://github.com/BCDevOps/backup-container). This (or something very similar) would be a very appropriate default for any team unsure of how many backups to keep.

If your team runs backups more often than once per day, you can add another appropriate line to your schedule and detail how many you plan to retain. Just remember that you must keep **every** delta backup you've taken since the last complete backup. If your team runs multiple backups per day, it would be a good idea to run one complete backup every day or every other day.

[ ] **How will your team be notified of backup problems?**

Backup problems can appear in two different ways:
1. The backup process can fail. The backup utility will produce an error and usually doesn't produce a dump file.
2. The backup utility thinks it has successfully produced a dump file, but the file is corrupted or incomplete. This will not produce an error until you attempt to recover your database from this dump file.

The second problem can remain hidden until you need the dump file. By then, it's too late, and you've lost data. In order to avoid this problem, your backup automation should include a step to recover your data into a temporary database. It should also include a test to make sure the expected data is present. Since you'll want to automate your recovery process anyway (as mentioned in [Recovering your data](#recovering-your-data)), this is a good opportunity to test it!

Both the backup and recovery test should send notifications to your team. The Platform Team recommends that you send notifications of both successes and failures. That way, if some failure prevents a notification from being sent, you can still tell there's a problem. Most teams set up a Rocketchat webhook to recieve the status information of both the backup and recovery processes. Teams usually set up the webhook to post these messages to a private channel for the team.

## Recovering Your Data

This second part of your data recovery plan should answer the following questions:

[ ] **How will your team access your dump files?**

In the previous section, you decided how to store your dump files. You should also plan for how you will access them if you need to recover your database.

If you have decided to use an `nfs-file-backup` PVC, you should consider what your recovery process would look like if:
* the PVC remains intact in your namespace.
* the PVC needs to be recovered from the external backup. Remember that this means you will need to contact the storage administrators for their help in recovering your dump files. You should find out now what that process looks like and how to contact them.

If you have decided to use an S3 bucket, your recovery process should include a step for pulling the dump file from the S3 bucket to a local PVC. You should already have recovery automation in place for testing your dump files, but this process probably happens before the dump file is sent to the S3 bucket. That's why it's important to make sure your team knows how to get it back out again, quickly and easily.

[ ] **What does the recovery process look like?**

Most teams plan to set up a new database and then recover their dump files into that database. This process is identical to how you would test your dump files after running a backup. It's easy, well-tested, and reliable. If you choose to use this method, you should consider that:
* your application will need to point to the service for this new database
* your pipeline or other deployment automation may view this new database as a different object from the old database

If your team wants to use point-in-time recovery, the process may look very different from recovering into a new database. The specific details will vary depending on the DBMS. You should investigate the documentation for your DBMS.

Your team should outline the full recovery process with special focus on those steps that are not included in the dump file tests. You will probably need to have multiple different recovery processes to account for the different types of database failure. You should consider what your recovery process will look like if:
* the database is still present and functioning, but has suffered data corruption
* the database has completely failed and needs to be reinitiated
* a larger failure requires that you recover into an empty namespace

Your team should schedule regular tests for each of the recovery procedures you develop.

## Monitoring Your Database

The best way to ensure the integrity of your data is to prevent problems from occurring in the first place. Monitoring your database status can help you to prevent issues that might otherwise require database recovery.

Most teams use [Sysdig](../app-monitoring/sysdig-monitor-onboarding.md) for monitoring many parts of their applications, including their databases. Full documentation on monitoring is out of the scope of this particular document, but you'll be able to find more on that in our Sysdig documentation!

When setting up monitoring for your database, you should pay special attention to:
* remaining storage space
* load on the primary database instance
* error messages appearing the logs

Your team should set up thresholds that trigger Sysdig to notify you. When setting up these thresholds, remember that you're trying to learn about potential problems before they become problems. Make sure you leave enough room between your threshold and point of failure so that your team has time to learn about the problem and act on it before failure occurs.

Keep in mind:
* many DBMS will prevent your database from starting if the storage is too full. This is to prevent data corruption. You should set your threshold well below this point for your DBMS. For Patroni, this is 90%, so we recommend a threshold of 80 or below.
* if you are close to the maximum quota for your namespace, you may not be able to increase your storage space or CPU/memory to prevent failure while you investigate the root cause. Set your thresholds accordingly.

## Automated Backup Solutions

So now you have an idea of what you hope to accomplish with your backup and recovery process. How do you implement this plan? There are many requirements, and building your own automation for all of this seems like a lot of work.

Good news! Since this is a common need, there are many tools available that you can use to automate much of your backup and recovery needs! This section discusses some of the more common tools in use on the platform. Remember that your team is not limited to using these tools. If you find something that works better for you, feel free to use it. Just remember, it's easier to get help for a tool that is commonly used!

### BCGov Backup Container

The [backup-container](https://github.com/BCDevOps/backup-container) is a community-supported tool build by and for developers working on the BCGov's OpenShift platform. It's our default recommendation for any database that isn't being controlled by an operator. If you're using Patroni or MongoDB, this is the solution for you.

The backup-container provides automation for both backing up and recovering your database. It automatically recovers the dump file in to an empty database and runs some simple tests against it to ensure that the dump file is useable. 

The recovery plan questions at a glance:
* **What data do you want to back up?** Everything.
* **How often you want to back up your data?** Configurable, but daily by default.
* **Where will the backups be stored?** An `nfs-file-backup` PVC. If you wish to use S3, you can add your own small automation step to send the dump file to your bucket.
* **How many backup files will you keep?** Configurable, but 6 daily, 4 weekly, 1 monthly by default.
* **How will your team be notified of backup problems?** Includes built-in steps for sending status of both backup and recovery test to Rocketchat.
* **How will your team access your dump files?** The built-in recovery process assumes that you already have a dump file on en `nfs-file-backup` PVC. Any additional steps to get it there (either by pulling from S3 or recovering the PVC) must be performed by the team.
* **What does the recovery process look like?** The built-in recovery process only recovers the dump file into an empty database. If you wish to use point-in-time recovery, your team will need to build appropriate automation for that. You will also need to cover any additional considerations for connecting your application to your recovered database or the recreation of other necessary objects.
* **How will your database be monitored?** Your team will need to set up their own monitoring.

### CrunchyDB Operator

The CrunchyDB operator allows teams to set up a Postgres database quickly and easily, and includes functionality for automating both backup and recovery. If your team is using the CrunchyDB operator, you should use this option. If your team is not using the operator to run your database, this option is not available.

You can read more in the official [documentation on CrunchyDB backup and restore functions](https://access.crunchydata.com/documentation/postgres-operator/4.1.2/overview/backup-restore-overview/). You'll also want to check out the [documentation on the PGO Scheduler](https://access.crunchydata.com/documentation/postgres-operator/4.1.2/overview/scheduler-overview/). The scheduler is used to automate the backup and restoration processes.

The recovery plan questions at a glance:
* **What data do you want to back up?** Everything.
* **How often you want to back up your data?** Configurable. You will need to use the scheduler to create your own schedule for both backups and recovery tests.
* **Where will the backups be stored?** Using the `local` option allows you to use the `nfs-file-backup` but requires that you set up the PVC on your own. Using the `s3` option is an easy way to automatically send your dump file to an S3 bucket.
* **How many backup files will you keep?** You will need to set up your own automation for cleaning up unnecessary backup files according to your set schedule.
* **How will your team be notified of backup problems?** You will need to set up your own notification for the status of backup and recovery jobs.
* **How will your team access your dump files?** Recovery from S3 is built-in if you use the `s3` option. Otherwise, you will need to recover your dumpfiles to a local `nfs-file-backup` PVC on your own.
* **What does the recovery process look like?** Using the `pgbackrest` option allows both recovery into an empty database and point-in-time recovery. Your team will need to handle any additional considerations for connecting your application to your recovered database or the recreation of other necessary objects.
* **How will your database be monitored?** Some monitoring tools are available as part of the operator. Your team will need to set up their own notifications.