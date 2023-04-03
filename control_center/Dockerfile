FROM node:18-slim

RUN sed -i s@/deb.debian.org/@/mirrors.aliyun.com/@g /etc/apt/sources.list
RUN sed -i s@/security.debian.org/@/mirrors.aliyun.com/@g /etc/apt/sources.list

RUN apt-get update \
    && apt-get install -y fontconfig xfonts-utils \
    && mkdir -p /usr/share/fonts/chinese
    
COPY ./static/fonts /usr/share/fonts/chinese
RUN chmod 766 /usr/share/fonts/chinese \
    && cd /usr/share/fonts/chinese \
    && mkfontscale \
    && mkfontdir \
    && fc-cache -fv


RUN rm -rf /etc/localtime && ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/package.json
COPY ./static/key/linux_signing_key.pub /usr/src/app/linux_signing_key.pub
RUN apt-get update \
    && apt-get install -y gnupg sudo \
    && sudo apt-key add linux_signing_key.pub \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN npm i

# copy code
COPY . /usr/src/app

EXPOSE 6591

CMD ["npm", "run", "start"]