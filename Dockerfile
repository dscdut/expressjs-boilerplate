FROM node:20-alpine AS base
RUN apk add --no-cache bash

WORKDIR /home/app
COPY package*.json /home/app   

FROM base AS dependencies
RUN npm install 

FROM dependencies AS build
COPY . /home/app