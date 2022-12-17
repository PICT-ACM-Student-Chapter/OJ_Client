FROM node:16-alpine3.14

WORKDIR /src

COPY . .

EXPOSE 3000

RUN apk update \
    && apk upgrade \
    && apk add --no-cache --upgrade bash