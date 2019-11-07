#!/bin/bash

validate_env_var() {
  VALUE="$1"
  NAME="$2"

  if [ -z "$VALUE" ]; then
    echo "##vso[task.logissue type=error;]Missing template parameter \"$NAME\""
    FAIL=1
  fi
}

validate_env_var "$APP_NAME" appName
validate_env_var "$APP_TEST" appTest
validate_env_var "$AZURE_SUBSCRIPTION" azureSubscription
validate_env_var "$ENVIRONMENT" environment
validate_env_var "$VAULT_RELEASE_ENVIRONMENT" releaseEnvironment

if [ "$FAIL" = 1 ]; then
  echo "##vso[task.complete result=Failed;]"
fi
