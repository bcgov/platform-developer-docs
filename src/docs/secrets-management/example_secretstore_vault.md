# Example SecretStore - Private Cloud Vault

## Summary

Because the Private Cloud Vault service uses OIDC, it is necessary to manually create a token in order to integrate it with the [External Secrets Operator](external-secrets.md).  Tokens are valid for one month and would have to be manually updated.

If that's acceptable to your team, see below for how to configure this.

## Requirements

To complete this setup, you need:

* Access to your project in Vault
* Edit access to your OpenShift namespaces

## Official documentation

[External Secrets Operator - HashiCorp Vault](https://external-secrets.io/latest/provider/hashicorp-vault/)

## Create a Secret to hold the Vault token
Create a new key/value Secret to contain the Vault token to be used by the SecretStore to connect to Vault.  For example:

```
oc create secret eso-vault-creds --from-literal=token=placeholder
```

## Create a Vault token
Generate a Vault token by logging in using either the Vault UI or the `vault` CLI.

**Token retrieveal from UI**

Log in to the [Vault UI](https://vault.developer.gov.bc.ca) as usual:

* Namespace: `platform-services`
* Method: `OIDC`
* Role: your project license plate, such as `abc123`

Click the profile icon in the upper right corner of the screen, then click 'Copy token'.

**Token retrieval from 'vault' CLI**

Set the role to be your project's license plate.  Here, we're using 'abc123' as an example.

```
vault login -method=oidc role=abc123 -address=https://vault.developer.gov.bc.ca
```

After completing the OIDC login, your session information will be displayed, including the token.

**Update the Secret with the token**

Edit the Secret that you already created ("eso-vault-creds" or name of your choice), setting the value of the token.

## Create a SecretStore
Use this example as a guide, being sure to update the secret name and key, and the path.

```
apiVersion: external-secrets.io/v1
kind: SecretStore
metadata:
  name: vault
spec:
  provider:
    vault:
      auth:
        tokenSecretRef:
          # Name of the OpenShift Secret that holds the Vault token
          name: eso-vault-creds
          # Name of the key in that Secret
          key: token
      # You need to include the Vault namespace
      namespace: platform-services
      # Set the path to be the name of one of your secrets engines, either
      #   abc123-nonprod or abc123-prod
      path: abc123-prod
      server: https://vault.developer.gov.bc.ca
      version: v2
```

## Create an ExternalSecret
The ExternalSecret refers to the SecretStore, the secret in Vault, and the corresponding OpenShift Secret.

```
apiVersion: external-secrets.io/v1
kind: ExternalSecret
metadata:
  name: db-creds
spec:
  secretStoreRef:
    kind: SecretStore
    # Match the name here with the name of your SecretStore
    name: vault
  target:
    # This is the name of the OpenShift Secret to create/update
    name: db-creds
  data:
    - remoteRef:
        # The name of the secret in the external secrets system
        key: dev-db-creds
        # The name of the key in that secret
        property: dev-db-user
      # The name of the key in the OpenShift secret
      secretKey: db-user
    - remoteRef:
        key: dev-db-creds
        property: dev-db-pass
      secretKey: db-pass
```

Note that the default refresh interval is one hour.  If you would like to set it to a lower value, add the `.spec.refreshInterval` parameter to the ExternalSecret.  For example:

```
spec:
  refreshInterval: 5m
```


