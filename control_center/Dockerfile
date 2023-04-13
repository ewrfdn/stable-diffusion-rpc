FROM node:16.13.2-alpine

RUN apk --update add tzdata \
  && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
  && echo "Asia/Shanghai" > /etc/timezone \
  && apk del tzdata

RUN apk add --update curl

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# add npm package
COPY package.json /usr/src/app/package.json

RUN npm i

# copy code
COPY . /usr/src/app

EXPOSE 31106 17860

CMD ["npm", "run", "start"]