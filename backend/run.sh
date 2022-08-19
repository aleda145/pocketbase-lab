#!/bin/bash
set -e

echo "Check diskspace on VM"
df -h

echo "litestream version"
litestream version

echo "Restore db if exists"
litestream restore -if-replica-exists /pb_data/data.db
litestream restore -if-replica-exists /pb_data/logs.db
echo "Restored successfully"

echo "replicate!"
exec litestream replicate -exec "/pocketbase serve --http 0.0.0.0:8090"
