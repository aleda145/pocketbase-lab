FROM golang:1.19-buster as builder

# build
WORKDIR /app

COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY ./pocketbase ./pocketbase
RUN go build -o /pocketbase pocketbase/main.go

ADD https://github.com/benbjohnson/litestream/releases/download/v0.3.9/litestream-v0.3.9-linux-amd64.tar.gz /tmp/litestream.tar.gz
RUN tar -C /usr/local/bin -xzf /tmp/litestream.tar.gz

# deploy
FROM debian:buster-slim
RUN set -x && apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    ca-certificates=20200601~deb10u2 && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /pocketbase /pocketbase
COPY --from=builder /usr/local/bin/litestream /usr/local/bin/litestream
COPY litestream.yml /etc/litestream.yml

COPY run.sh .


EXPOSE 8090
# TODO add a health check to the API
HEALTHCHECK NONE

ENTRYPOINT ["/app/run.sh"]
