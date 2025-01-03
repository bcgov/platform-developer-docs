# ArgoCD Management of a Route with a Certificate

In order to use ArgoCD to manage an Openshift Route which has a certificate, the certificate must be kept in a Secret, either in Vault or in the Openshift namespace.  Although a future version of Openshift Routes will allow the Route manifest itself to declare a Secret from which to load the certificate, this is not available yet.  The same functionality can be achieved by using an ArgoCD post-sync job to fetch the Secret and patch the Route.

This template uses a Vault secret for the certificate.

## The Certificate Secret
Create a secret in Vault that contains two key/value pairs.  One key should be `key` and the other key should be `certificate`.

## GitOps Setup

The files in this directory will require some modification in order to work in a given namespace.  They contain placeholders that must be changed to match your environment.

| Placeholder  | Value                                                                 |
| ------------ | --------------------------------------------------------------------- |
| LICENSEPLATE | Your project license plate, such as `abc123`                          |
| NAMESPACE    | Namespace name, such as `abc123-prod`                                 |
| ROUTENAME    | The name of the Route to patch                                        |
| SECRETKEY    | The name of the Vault secret containing the cert                      |
| VAULTROLE    | The name of the Vault role, such as `abc123-nonprod` or `abc123-prod` |

Place the modified files in your GitOps repository.  Note that the Job contains an annotation:

`argocd.argoproj.io/hook: PostSync`

This causes ArgoCD to run the Job after the other resources have been synchronized.  The Job does not appear in the UI along with the other resources.  The Job will run after every sync.


