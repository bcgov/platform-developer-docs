# External Secrets

The **External Secrets Operator** is a Kubernetes operator that integrates external secret management systems, such as [Azure Key Vault](https://azure.microsoft.com/en-us/products/key-vault/) and [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html).  The operator reads information from external APIs and automatically injects the values into a Kubernetes Secret.

The goal of External Secrets Operator is to synchronize secrets from external APIs into Kubernetes. ESO uses custom resources `ExternalSecret` and `SecretStore` to provide a user-friendly abstraction for the external API that stores and manages the lifecycle of the secrets for you.

The operator is installed in each cluster and provides **self-serve functionality**.  The External Secrets Operator:
* gives you the flexibility to use any of dozens of secrets management services
* allows you to use a single secrets management service for your hybrid cloud environment
* adds redundancy to your secrets management system

Refer to the [official External Secrets Operator documentation](https://external-secrets.io/latest/) for more information.

## How External Secrets Operator works
Secrets integration works by creating a `SecretStore`, which configures the connection and credentials for your external secrets management system, and `ExternalSecrets`, which define exactly which secrets and keys to replicate to OpenShift.

Create the SecretStore and ExternalSecrets in each namespace where you want to replicate secrets.

## Create a SecretStore
The SecretStore custom resource contains the address and credentials of the secrets management service.  The exact way it is configured depends on the service.

Documentation for each supported service can be found in the [provider list](https://external-secrets.io/latest/provider/aws-secrets-manager/).  Please use that documentation to set up your SecretStore; the process will vary from service to service.

If you are using Azure Key Vault, refer to [Example SecretStore - Azure Key Vault](example_secretstore_azure_key_vault.md).

## Create an ExternalSecret
An ExternalSecret contains references to the SecretStore that defines the external service as well as the individual secrets in that external service.

There is a one to one relationship between ExternalSecrets and OpenShift Secrets.  Any secrets (key/value pairs or other kind of secret) that are defined in the ExternalSecret are created within the stated OpenShift Secret.

The main configuration elements of an ExternalSecret are:
* `.spec.secretStoreRef.name` - the name of the SecretStore to use
* `.spec.target.name` - the name of the OpenShift Secret to create
* `.spec.data[].remoteRef` - the names of the keys in both the external secret and OpenShift Secret

Here is an example:
```
apiVersion: external-secrets.io/v1
kind: ExternalSecret
metadata:
  name: my-app-1
  namespace: abc123-dev
spec:
  refreshInterval: 1h
  secretStoreRef:
    kind: SecretStore
    name: azure-key-vault
  target:
    creationPolicy: Owner
    deletionPolicy: Retain
    name: my-app-1
  data:
    - remoteRef:
        conversionStrategy: Default
        decodingStrategy: None
        key: dev-db-user
        metadataPolicy: None
      secretKey: db-user
    - remoteRef:
        conversionStrategy: Default
        decodingStrategy: None
        key: dev-db-pass
        metadataPolicy: None
      secretKey: db-pass
```

In this example, we have:
* .spec.secretStoreRef.name = azure-key-vault; this is the name of the SecretStore
* .spec.target.name = my-app-1; this is the name of the OpenShift Secret to create
* .spec.data[].remoteRef.key = dev-db-pass; this is the name of the key in the external secret
* .spec.data[].secretKey = db-pass; this is the name of the key for the key/value pair in the OpenShift Secret

For more information when creating an ExternalSecret, use the `oc` CLI, such as:
```
oc explain externalsecret.spec.data
```

```
oc explain externalsecret.spec.refreshInterval
```

or edit it in the YAML view in the OpenShift UI and click on the the 'View sidebar' link.

