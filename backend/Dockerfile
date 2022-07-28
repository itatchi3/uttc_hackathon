FROM golang:1.13.11-alpine3.11 AS build

ENV GO111MODULE=on

WORKDIR /

COPY . /go/src/uttc_backend

RUN apk update && apk add --no-cache git
RUN cd /go/src/uttc_backend/api && go build -o bin/backend main.go

FROM alpine:3.8

COPY --from=build /go/src/uttc_backend/api/bin/backend /usr/local/bin/

CMD ["backend"]
