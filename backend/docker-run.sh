docker run -it --publish 8090:8090 \
-e R2_BUCKET="${R2_BUCKET}" \
-e R2_ACCESS_KEY="${R2_ACCESS_KEY}" \
-e R2_SECRET_KEY="${R2_SECRET_KEY}" \
-e R2_DATA_PATH="${R2_DATA_PATH}" \
-e R2_LOGS_PATH="${R2_LOGS_PATH}" \
-e R2_URL="${R2_URL}" \
pocketbase:latest --rm 
