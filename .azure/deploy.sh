#!/usr/bin/env bash
set -eu
cd $(dirname ${BASH_SOURCE[0]})
source .settings
source .prod.env
cd ..

client_id="$(echo $AZURE_CREDENTIALS | jq -r .clientId)"
client_secret="$(echo $AZURE_CREDENTIALS | jq -r .clientSecret)"
subscription_id="$(echo $AZURE_CREDENTIALS | jq -r .subscriptionId)"
tenant_id="$(echo $AZURE_CREDENTIALS | jq -r .tenantId)"
commit_sha="$(git rev-parse HEAD)"


