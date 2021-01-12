FROM node:12.18-alpine

RUN apk update && apk upgrade && apk add bash

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python

WORKDIR /app

ADD package.json /app/

RUN npm i

COPY . /app/

EXPOSE 5000

CMD ["npm", "start"]