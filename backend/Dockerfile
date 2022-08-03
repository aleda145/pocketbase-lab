FROM golang:1.19-buster as builder

# build
WORKDIR /app

COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY ./pocketbase ./pocketbase
RUN go build -o /pocketbase pocketbase/main.go
#checkov:skip=CKV_DOCKER_4: Ensure that COPY is used instead of ADD in Dockerfiles
# Because we want to add from a remote URL, and there is no reason not to trust benbjohnson
# ADD https://github.com/benbjohnson/litestream/releases/download/v0.3.8/litestream-v0.3.8-linux-amd64-static.tar.gz /tmp/litestream.tar.gz
# RUN tar -C /usr/local/bin -xzf /tmp/litestream.tar.gz

# deploy
FROM debian:buster-slim
RUN set -x && apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    ca-certificates=20200601~deb10u2 && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /pocketbase /pocketbase
# COPY --from=builder /usr/local/bin/litestream /usr/local/bin/litestream
# COPY litestream.yml /etc/litestream.yml

COPY run.sh .


EXPOSE 8090
# TODO add a health check to the API
HEALTHCHECK NONE
#checkov:skip=CKV_DOCKER_3: Ensure that a user for the container has been created
# Because it will run as root on the VM anyway, and there is nothing else there but a docker container

CMD ["/app/run.sh"]
