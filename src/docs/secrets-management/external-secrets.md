---
title: External secrets

slug: external-secrets-operator

description: The External Secrets Operator can link your OpenShift namespace with an external secrets management service.

keywords: 

page_purpose: Describes the purpose and use of the External Secrets Operator

audience: developer, technical lead

author: Ian Watts

content_owner: Ian Watts

sort_order: 3
---

# External Secrets

The **External Secrets Operator (ESO)** is a Kubernetes operator that connects to external secret management systems like [Azure Key Vault](https://azure.microsoft.com/en-us/products/key-vault/) and [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html).  The operator reads information from external APIs (systems) and automatically adds them to Kubernetes as Secrets.

ESO's main purpose to keep your Kubernetes Secrets in sync with external APIs. It uses custom resources `ExternalSecret` and `SecretStore` to provide a user-friendly abstraction for the external API that stores and manages the lifecycle of the secrets for you.

ESO is available in each cluster. It's **self-serve**, so you can:

* Choose from many different secret management services
* Use the same service across your hybrid cloud environment
* Add redundancy to your secrets management set up

For more details, visit the [official External Secrets Operator documentation](https://external-secrets.io/latest/).

Note that OpenShift Secrets are now encrypted on disk, which resolves what was previously a security concern.

## How External Secrets Operator works

To connect to an external secrets management system, you create two resources:

* A `SecretStore`, which sets up the connection and credentials
* One or more `ExternalSecrets`, which define the specific secrets and keys to copy into OpenShift

Create both resources  in each namespace where you want to replicate secrets.

## Create a SecretStore
The `SecretStore`  resource stores the address and credentials for your secrets management service.  The setup depends on which service you're using.

Check the [provider list](https://external-secrets.io/latest/provider/aws-secrets-manager/) for setup instructions specific to your service.

If you are using Azure Key Vault, see the [Example SecretStore - Azure Key Vault](example_secretstore_azure_key_vault.md).

## Create an ExternalSecret
An `ExternalSecret` connects to a `SecretStore` and lists the specific secrets you want to copy from the external service. Each `ExternalSecret` creates one OpenShift secret. 

The key-value pairs or other secret data you define in the `ExternalSecret`  are automatically added to the OpenShift secret.

Here is an example:
```
apiVersion: external-secrets.io/v1
kind: ExternalSecret
metadata:
  name: my-app-1
  namespace: abc123-dev
spec:
  secretStoreRef:
    kind: SecretStore
    # The name of your SecretStore
    name: azure-key-vault
  target:
    # The name of the Secret in OpenShift.
    # It will be created if it does not already exist.
    name: my-app-1
  data:
    - remoteRef:
        # The name of the key in the external secrets system
        key: dev-db-user
      # The name of the key in the OpenShift secret
      secretKey: db-user
    - remoteRef:
        key: dev-db-pass
      secretKey: db-pass
```

For more information when creating an ExternalSecret, use the `oc` CLI, such as:
```
oc explain externalsecret.spec
```

```
oc explain externalsecret.spec.refreshInterval
```

or edit it in the YAML view in the OpenShift UI and click on the the 'View sidebar' link.

