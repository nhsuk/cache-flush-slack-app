#!/bin/bash

if [ -z "$APP_SERVICE_HOST" ]; then
  echo "APP_SERVICE_HOST is not set, unable to continue."
  exit 1
fi

APP_SERVICE_URL=$APP_SERVICE_HOST/api/slash-start

# Use the env var set from the previous task with the path to the function app
echo "Going to make request to function app: '$APP_SERVICE_URL'. "

HTTP_STATUS=$(curl -sS -o /dev/null -w "%{http_code}" -XPOST "$APP_SERVICE_HOST?code=$FUNCTION_KEY")

# This is a basic test to check the function app has been deployed. If the
# deployment has failed no site exists.
if [ "$HTTP_STATUS" = "204" ]; then
  echo "Got status '$HTTP_STATUS'. The app has been deployed successfully."
else
  echo "HTTP Status code was not 200. It looks like the app has not been deployed successfully."
  exit 1
fi
