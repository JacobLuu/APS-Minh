FROM node:16.13.1-alpine

WORKDIR /usr/src/aps-frontend

EXPOSE 3001

ENTRYPOINT ["yarn", "start:frontend"]
