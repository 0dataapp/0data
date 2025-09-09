FROM node:16

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy package.json in isolation to detect changes
ADD package.json package-postinstall.js /usr/src/app/
RUN npm install

ADD . /usr/src/app

ENV PORT 80
EXPOSE 80

CMD [ "npm", "start" ]
