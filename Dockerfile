# FROM node:21-alpine3.18
# # RUN npm prune --production
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN apk add g++ make py3-pip
# COPY . .
# EXPOSE 8080
# # RUN npm run build-only
# # RUN npm run start
# RUN node -v
# RUN npm -v
# CMD [ "node", "app.js" ]

FROM alpine:3.17.2
ENV NODE_PACKAGE_URL  https://unofficial-builds.nodejs.org/download/release/v18.16.0/node-v18.16.0-linux-x64-musl.tar.gz

# install necessary libd/packages
RUN apk add libstdc++
WORKDIR /opt
RUN wget $NODE_PACKAGE_URL
RUN mkdir -p /opt/nodejs
RUN tar -zxvf *.tar.gz --directory /opt/nodejs --strip-components=1
RUN rm *.tar.gz
RUN ln -s /opt/nodejs/bin/node /usr/local/bin/node
RUN ln -s /opt/nodejs/bin/npm /usr/local/bin/npm
RUN npm install -g npm@9.6.6
RUN apk add g++ make py3-pip

# add our files
WORKDIR /usr/src/app
COPY . .
EXPOSE 3000

RUN npm install
RUN npm run build-only
# RUN npm run start
CMD [ "npm", "start" ]