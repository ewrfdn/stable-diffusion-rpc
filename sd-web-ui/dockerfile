FROM nginx:1.23.4-alpine-slim

# RUN npm install -g serve
RUN apk add --no-cache bash

WORKDIR /app

COPY ./dist ./ui
COPY ./docker/nginx.conf.template  /etc/nginx/nginx.conf

EXPOSE 80

# ENTRYPOINT ["./docker_entrypoint.sh"]

CMD [ "nginx", "-g", "daemon off;"]