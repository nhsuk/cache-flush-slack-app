#!/bin/bash

if [ -z "$APP_SERVICE_HOST" ]; then
  echo "APP_SERVICE_HOST is not set, unable to continue."
  exit 1
fi

APP_SERVICE_URL=$APP_SERVICE_HOST/api/FastPurgeUrls

# Use the env var set from the previous task with the path to the function app
echo "Going to make request to function app: '$APP_SERVICE_URL'. "

RESPONSE=func-app-response.json

curl -sS -o "$RESPONSE" -XPOST "$APP_SERVICE_URL?code=$FUNCTION_KEY" -H "Content-Type: application/json" -d "@./scripts/resources/test-payload.json"
HTTP_STATUS=$(jq '.httpStatus' $RESPONSE)
echo "Got status '$HTTP_STATUS' from the response body of the request made to the function app."

# httpStatus (HTTP_STATUS) should be 403. This is the status code returned from
# Akamai's API. Recieving a 403 means the function app has been deployed and is
# communicating with Akamai, but the payload contains a URL that is not 'owned'
# by NHS.UK so the response comes back as unauthorized..
if [ "$HTTP_STATUS" = "403" ]; then
  echo "HTTP Status code was 403. The function app has been deployed successfully and is able to communicate with Akamai."
else
  echo "HTTP Status code was not 403. Please confirm the function app has been deployed successfully."
  echo "The response was:"
  echo $RESPONSE
  exit 1
fi
