FROM node:16

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy package.json in isolation to detect changes
COPY package.json package-postinstall.js /usr/src/app/
RUN npm install

COPY . /usr/src/app

ENV PORT 80
EXPOSE 80

CMD [ "npm", "start" ]
