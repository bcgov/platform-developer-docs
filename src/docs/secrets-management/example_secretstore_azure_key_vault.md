# Example SecretStore - Azure Key Vault

## Summary

In order to use Azure Key Vault with the [External Secrets Operator](external-secrets.md), you need to create a Service Principal with the right permissions. You then store the Service Principal’s credentials in a Kubernetes Secret in each namespace where you’ll create `SecretStore` and `ExternalSecret` resources.

## Requirements

To complete this setup, you need:

* Access to your Azure Key Vault
* Access to your OpenShift namespaces
* Docker or Podman, if you're using the Azure CLI

You can create the Service Principal using either the Azure CLI or the Azure Portal. This guide uses the CLI method. If you prefer the portal, see [Register a Microsoft Entra app and create a service principal](https://learn.microsoft.com/en-us/entra/identity-platform/howto-create-service-principal-portal).

## Official documentation

[External Secrets Operator - Azure Key Vault Provider](https://external-secrets.io/latest/provider/azure-key-vault/)

## Start the Azure CLI Container

We recommend running the Azure CLI in a Docker or Podman container. Installing the CLI directly on your machine requires many dependencies, which might conflict with other tools or take up unnecessary space if you only need it for this task.

Make sure you have a running Docker or Podman environment before starting.

Start the container:

```
podman run -it mcr.microsoft.com/azure-cli:cbl-mariner2.0
```

Once it's running and you have a command prompt, run `az` to see version and help information.

```
az
```

Log in to Azure by running `az login` in the container and following the instructions.

```
root [ / ]# az login
To sign in, use a web browser to open the page https://microsoft.com/devicelogin and enter the code ... to authenticate.
```

Make a note of the subscription ID in the output of the login command.

## Create the Service Principal

To create the Service Principal, make sure you have the following information:

* Your Azure subscription ID
* The name of your Key Vault
* The resource group of your Key Vault

You’ll use this information when you run the Azure CLI commands in the next steps:
```
export SUBSCRIPTION_ID="your-subscription-ID"
export KEY_VAULT_NAME="your-key-vault-name"
export RESOURCE_GROUP="your-key-vaults-resource-group"
export SP_NAME="name-of-service-principal-to-create"
```

Run the command to create the service principal:
```
az ad sp create-for-rbac --name "${SP_NAME}" --role "Key Vault Secrets User" --scopes /subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP}/providers/Microsoft.KeyVault/vaults/${KEY_VAULT_NAME} --sdk-auth
```

Save a copy of the output from this command - you'll need `clientId`, `clientSecret`, and `tenantId`.  Set the client credentials as environment variables if you'd like to copy the command below to create the Secret.
```
export CLIENT_ID=clientId_from_output
export CLIENT_SECRET=clientSecret_from_output
```

## Create the OpenShift Secret

First, create a Secret in your OpenShift namespace to store your Azure Service Principal credentials.  You can use the UI if you like, or use the following command:
```
oc create secret generic azure-key-vault-creds --from-literal=clientId=${CLIENT_ID} --from-literal=clientSecret=${CLIENT_SECRET}
```

## Assign permissions to the Service Principal

Using the Azure CLI, get a list of Service Principals:

```
az ad sp list --show-mine
```

If you see more than one, look for the one with the `displayName` that is equal to your new Service Principal.  Find its `id`  for that entry and assign it to an environment variable.
```
export OBJECT_ID="the-service-principals-id"
```

Or, use `jq` to extract it automatically:
```
export OBJECT_ID=`az ad sp list --show-mine | jq -r ".[] | select(.displayName == \"${SP_NAME}\") | .id"`
```

Now assign the right permissions to your Service Principal so it can access Secrets in Azure Key Vault:
```
az keyvault set-policy --name ${KEY_VAULT_NAME} --object-id ${OBJECT_ID} --secret-permissions get list
```

## Create a SecretStore
Next, create a YAML manifest for the `SecretStore`.  Be sure to enter the correct values for the `tenantId` and the name of the Secret that you created above.
```
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: azure-key-vault
  namespace: abc123-dev
spec:
  provider:
    azurekv:
      tenantId: "MY_TENANT_ID"
      vaultUrl: https://my-key-vault-name.vault.azure.net/
      authSecretRef:
        clientId:
          name: azure-key-vault-creds
          key: clientId
        clientSecret:
          name: azure-key-vault-creds
          key: clientSecret
```

After applying the YAML manifest, check the status of the new SecretStore.  It should show as ready.
```
status:
  capabilities: ReadWrite
  conditions:
    - lastTransitionTime: "2025-05-21T17:43:07Z"
      message: store validated
      reason: Valid
      status: "True"
      type: Ready
```

Once the SecretStore is ready, you can create an [ExternalSecret](external-secrets.md#create-an-externalsecret) to sync your secrets.
