FROM alpine

RUN apk update && apk upgrade
RUN apk add nodejs nodejs-npm

ADD . /code
WORKDIR /code
RUN npm install


CMD [ "npm", "start" ]