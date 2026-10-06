# Example SecretStore - Azure Key Vault

## Summary

In order to use Azure Key Vault with the [External Secrets Operator](external-secrets.md), you need to create a Service Principal with the right permissions. You then store the Service Principal’s credentials in a Kubernetes Secret in each namespace where you’ll create `SecretStore` and `ExternalSecret` resources.

## Requirements

To complete this setup, you need:

* Access to your Azure Key Vault
* Access to your OpenShift namespaces

## Official documentation

[External Secrets Operator - Azure Key Vault Provider](https://external-secrets.io/latest/provider/azure-key-vault/)

## Create the Service Principal

You can request a Service Principal from the Azure team (ADMS).  See [Requesting a Microsoft Entra app registration](https://developer.gov.bc.ca/docs/default/component/public-cloud-techdocs/azure/design-build-deploy/app-registration/).

In your request, include a message stating that the Service Principal should be exempt from MFA so that it can be used by automated processes.  Also include the key vault name and resource group, which are available via the portal.  Permissions should include the Secret Permissions 'get' and 'list'.

Once the Service Principal is created, you will need its Client ID, Client Secret, and Tenant ID.

## Create the OpenShift Secret

Create a Secret in your OpenShift namespace to store your Azure Service Principal credentials.  You can use the UI if you like, or use the following command:
```
oc create secret generic azure-key-vault-creds --from-literal=clientId=${CLIENT_ID} --from-literal=clientSecret=${CLIENT_SECRET} --from-literal=tenantId=${TENANT_ID}
```

## Create a SecretStore
Next, create a YAML manifest for the `SecretStore`.  Be sure to enter the correct value for the name of the Secret that you created above.
```
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: azure-key-vault
  namespace: abc123-dev
spec:
  provider:
    azurekv:
      vaultUrl: https://my-key-vault-name.vault.azure.net/
      authSecretRef:
        clientId:
          name: azure-key-vault-creds
          key: clientId
        clientSecret:
          name: azure-key-vault-creds
          key: clientSecret
        tenantId:
          name: azure-key-vault-creds
          key: tenantId
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
