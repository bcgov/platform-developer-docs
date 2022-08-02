# Open-Source Database Technologies

If you haven't yet taken a look at our [High Availability Database Clusters](high-availability-database-clusters.md) documentation, we recommend you check that out first. It contains an outline of how databases work on the Openshift platform and why it's important to use highly-available databases. All the technologies discussed here are highly-available.
## Postgres

[Postgres](https://www.postgresql.org/) is the most common database running on the Openshift platform. It is not highly available on its own, so teams use [Patroni](https://github.com/bcgov/patroni-postgres-container) or [CrunchyDB](https://github.com/bcgov/how-to-workshops/tree/master/crunchydb). These are both ways to deploy Postgres in a highly-available way. 

Postgres is a [relational database](https://insightsoftware.com/blog/whats-the-difference-relational-vs-non-relational-databases/). If a non-relational database would better suit your application's needs, consider [MongoDB](#mongodb) instead.

[Patroni](https://github.com/bcgov/patroni-postgres-container) the most common highly available solution on the platform. It is very well-supported by the development community in the BC Government. However, it is older and less flexible than the CrunchyDB Operator. You can find a Platform Team supported image for Patroni at `artifacts.developer.gov.bc.ca/bcgov-docker-local/patroni-postgres`.

[CrunchyDB](https://github.com/bcgov/how-to-workshops/tree/master/crunchydb) is easier to implement and has many more powerful functions than Patroni. It's also more resilient to failure than Patroni. However, since it is new, there are currently fewer community-created tools and templates for CrunchyDB. The operator includes its own image to ensure the best possible compatibility, so the Platform Team does not provide an image for use with the operator. We recommend that you read through the [official CrunchyDB documentation](https://access.crunchydata.com/documentation/postgres-operator/4.1.2/gettingstarted/) to get a full understanding of the features offered by the operator.

## MongoDB

[MongoDB](https://www.mongodb.com/) is the next most common database. It has built-in HA capabilities, and you can find an [example of how to deploy a Mongo replica set on Github](https://github.com/bcgov/mongodb-replicaset-container). 

MongoDB is a [non-relational database](https://insightsoftware.com/blog/whats-the-difference-relational-vs-non-relational-databases/). If a relational database would better suit your application's needs, consider [Postgres](#postgres) instead.

You can find Platform Team supported image for MongoDB at `artifacts.developer.gov.bc.ca/bcgov-docker-local/mongodb-36-ha`. 

## Redis

[Redis](https://redis.io/) technically isn't a database at all. It's an in-memory datastore. Because it keeps the data in-memory, it is very fast but requires a lot of memory to run. It's best used for very small datasets that need to be accessed very quickly. Despite being an in-memory datastore, it's still able to store its data on-disk, which means you can use persistent volume claims (PVCs) on Openshift to ensure that the data will persist after the pod restarts. It also has fewer of the strict limitations placed on most databases.  

The Platform Team does not provide a supported image for Redis. 

