# Example SecretStore - Azure Key Vault

## Summary
In order to use Azure Key Vault with the [External Secrets Operator](external-secrets.md), a Service Principal must be created with the necessary permissions.  Credentials for the Service Principal are set in a Secret in the namespaces where SecretStore and ExternalSecret resources will be created.

## Requirements
* Access to your Azure Key Vault
* Access to your OpenShift namespaces
* If using the Azure CLI, podman or docker is recommended

An Azure service principal can be created using the CLI or by logging in to the Azure Portal.  This document describes the CLI process.  To use the Azure portal to create the service principal, see [Register a Microsoft Entra app and create a service principal](https://learn.microsoft.com/en-us/entra/identity-platform/howto-create-service-principal-portal).

## Official Documentation
https://external-secrets.io/latest/provider/azure-key-vault/

## Start the Azure CLI Container
We recommend that you run the Docker container for the Azure CLI, because installation of the CLI on your workstation involves a lot of packages and updates, which could potentially cause version issues for other tools you use, and because it's a lot to install for a single task.  You are, of course, welcome to install the CLI directly on your workstation.

You'll need a running Docker server or Podman machine.

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
You will need:
* The subscription ID of your Azure account
* The name of your key vault
* The resource group of your key vault

In the Azure CLI container, set environment variables, entering the appropriate values: 
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
Create a Secret in your OpenShift namespace.  You can use the UI, if you like, or use the following commands.
```
oc create secret generic azure-key-vault-creds --from-literal=clientId=${CLIENT_ID} --from-literal=clientSecret=${CLIENT_SECRET}
```

## Assign Permissions to Service Principal
In the Azure CLI, get a list of service principals.
```
az ad sp list --show-mine
```

If there are more than one, find the entry with the `displayName` that is equal to your new service principal.  Locate the `id` field for that entry and assign it to an environment variable.
```
export OBJECT_ID="the-service-principals-id"
```

Alternatively, let `jq` do it for you:
```
export OBJECT_ID=`az ad sp list --show-mine | jq -r ".[] | select(.displayName == \"${SP_NAME}\") | .id"`
```

Assign permissions:
```
az keyvault set-policy --name ${KEY_VAULT_NAME} --object-id ${OBJECT_ID} --secret-permissions get list
```

## Create a SecretStore
Create a YAML manifest for the SecretStore.  Be sure to enter the correct values for the `tenantId` and the name of the Secret that you created above.
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

Check the status of the new SecretStore.  It should show as ready.
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

Now you're ready to [create an ExternalSecret](external-secrets.md#create-an-externalsecret).

