# A Slack app to communicate with [cache-flush](https://github.com/nhsuk/cache-flush)

[![GitHub Release](https://img.shields.io/github/release/nhsuk/cache-flush-slack-app.svg)](https://github.com/nhsuk/cache-flush-slack-app/releases/latest/)
[![Build Status](https://dev.azure.com/nhsuk/nhsuk.utilities/_apis/build/status/nhsuk.cache-flush-slack-app?branchName=master)](https://dev.azure.com/nhsuk/nhsuk.utilities/_build/latest?definitionId=333&branchName=master)

> A Slack app built as an Azure (durable) Functions App for communicating with
> the [cache-flush](https://github.com/nhsuk/cache-flush) function app.

## Installation

* Install the appropriate version of
  [Azure Functions Core Tools version 2.x](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local#install-the-azure-functions-core-tools)
  for your development platform of choice
* Clone the repository - `git clone https://github.com/nhsuk/cache-flush-slack-app.git`
* Install npm dependencies - `npm install`
* Rename [example.local.settings.json](example.local.settings.json) to
  [local.settings.json](local.settings.json). Edit the file to include valid
  values.

## Run Azure Function App locally

* Start the Function app - `func start`

## Slack app setup and lifecycle

The Slack app is configured to use `Interactive Components` and `Slash
Commands`. The lifecycle of the application starts with a user initiating a
request with a
[slash command](https://api.slack.com/interactivity/slash-commands). The
details of the command can vary but the `Request URL` must be set to the
endpoint `/api/slash-start` (this can be changed easily within both the Slack
app and the Function app).

When the application receives the slash command request it will respond with a
[modal](https://api.slack.com/surfaces/modals) view. The lifecycle of the modal
is handled by the Function app. The `Request URL` must be set to the endpoint
`/api/orchestrator-client` (this can be changed easily within both the Slack
app and the Function app).

Submitting the request to flush the URLs from the cache in the modal initiates
a request to the [cache-flush](https://github.com/nhsuk/cache-flush) app. The
request is likely to take several seconds (and may take 10-20 seconds depending
on the state of the APIs i.e. whether they are running hot or cold). When the
response is received it will be displayed within the modal view (if it is still
open) and a direct message will be sent to the user.


## Deployments and environments

Deployments to all environments are fully automated and are tested to confirm
the deployment has been successful as part of the deployment process.
Therefore, if the deployment job succeeds you can be confident the application
is working.

Deployments are configured via [azure-pipelines.yml](./azure-pipelines.yml) and
run within the
[nhsuk.utilities](https://dev.azure.com/nhsuk/nhsuk.utilities/_build?definitionId=323)
project. The pipeline is not public. In order to view it a login is required.
The deployed applications are protected using the standard function app
authorisation mechanism i.e.
[authorization keys](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-http-webhook#authorization-keys).
The keys are maintained as secrets to prevent abuse and unwanted use.

### Review environments
Review environments are deployed for every PR and are available at
[https://nhsuk-cache-flush-slack-app-func-dev-uks-pr-<PR_NUMBER>.azurewebsites.net/](https://nhsuk-cache-flush-slack-app-func-dev-uks-pr-XXX.azurewebsites.net/).
When a PR is merged into `master` the review environment will be deleted.

### [Integration](https://nhsuk-cache-flush-slack-app-func-int-uks.azurewebsites.net/)
Merges to `master` generate a deployment to the integration environment.

### [Staging](https://nhsuk-cache-flush-slack-app-func-stag-uks.azurewebsites.net/)
The creation of a [release](https://github.com/nhsuk/cache-flush-slack-app/releases)
generates a deployment to the staging environment.

### [Production](https://nhsuk-cache-flush-slack-app-func-prod-uks.azurewebsites.net/)
Deployments to production are only possible if the change has been deployed to
the staging environment. The deployment to production must be
[approved](https://docs.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops#approvals).
Using approvals enables a pause between the deployment to staging and the
deployment to production. It is often necessary to seek a sign-off prior to
deploying to production and this setup allows that to happen.

## Environment variables

Environment variables are expected to be managed by the environment in which
the application is being run. This is best practice as described by
[twelve-factor](https://12factor.net/config). Environment variables are stored
in an instance of [HashiCorp Vault](https://www.vaultproject.io/) and retrieved
by running
[./scripts/get-variables-from-vault.sh](./scripts/get-variables-from-vault.sh).

The script requires the following environment variables to run successfully.
The script will validate the existence of the variables before making a request
to Vault.
There are no default values and they all must have a value set.

| Variable                    | Description                                                                                                          |
| --------                    | -----------                                                                                                          |
| `VAULT_APP_NAME`            | The name/path of the app where the env vars should be retrieved from within Vault e.g. `nhsuk.cache-flush-slack-app` |
| `VAULT_RELEASE_ENVIRONMENT` | The name/path of the environment where the env vars should be retrieved from within Vault e.g. `dev`                 |
| `VAULT_SERVER`              | FQDN including protocol of the Vault server e.g. `https://my.vault.com`                                              |
| `VAULT_TOKEN`               | The token used to authenticate with Vault                                                                            |

The following environment variables are required for the application to run
successfully.
There are no default values and they all must have a value set.

| Variable                                               | Description                                                                                                                                                                       |
| --------                                               | -----------                                                                                                                                                                       |
| `CACHE_FLUSH_FUNCTION_APP_FULL_URL_WITH_PATH_AND_CODE` | The full URL to the cache flush function app including protocol, path to the function and the code query string parameter                                                         |
| `SLACK_BOT_USER_OAUTH_ACCESS_TOKEN`                    | The OAuth Access Token for the app's [Bot User](https://api.slack.com/docs/token-types#bot)                                                                                       |
| `SLACK_SIGNING_SECRET`                                 | The [Secret](https://api.slack.com/docs/verifying-requests-from-slack#app_management_updates) used by Slack to sign requests allowing the app to verify the origin of the request |

During deployment of the application additional environment variables are
retrieved from Vault. They define the details of where the application will be
deployed within Azure.

The variables vary for each environment.
There are no default values and they all must have a value set.

| Variable                       | Description                                                                                                                                                |
| --------                       | -----------                                                                                                                                                |
| `APP_PLAN`                     | [The App Service plan](https://docs.microsoft.com/en-us/azure/app-service/overview-hosting-plans) used by the function app                                 |
| `LOCATION`                     | [The location](https://azure.microsoft.com/en-us/global-infrastructure/locations/) where the function app is deployed to                                   |
| `RESOURCE_GROUP`               | [The Resource Group](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-overview#resource-groups) the function app belongs to    |
| `WEBSITE_NODE_DEFAULT_VERSION` | [Version of node used by function app runtime](https://docs.microsoft.com/en-us/azure/azure-functions/functions-app-settings#website_node_default_version) |
