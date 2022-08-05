#!/bin/bash
set -e

echo "Check diskspace on VM"
df -h

echo "litestream version"
litestream version

# # Docker entry point for image will decode the base64 secret and put it into the GOOGLE_APPLICATION_CREDENTIALS PATH that has been specified
# # this has to be done before litestream starts!
# # Should be no issue with the correct entrypoint
# # then it can be used by flyctl secrets as well
# # https://www.avaitla16.com/google-application-credentials-json-as-an-environment-variable
# # https://community.fly.io/t/how-are-you-managing-cert-files-with-fly/2984/20

# echo "set gcp key"
# echo "$GCP_KEY" | base64 -d > "$GOOGLE_APPLICATION_CREDENTIALS"

echo "Restore db if exists"
litestream restore -if-replica-exists /pb_data/data.db
litestream restore -if-replica-exists /pb_data/logs.db
echo "Restored successfully"

echo "replicate!"
exec litestream replicate -exec "/pocketbase serve --http 0.0.0.0:8090"
