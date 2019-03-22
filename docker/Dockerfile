FROM registry.gs.youyuwo.com/nginx:1.10.0-alpine

COPY dist usr/share/nginx/html
COPY docker/favicon.ico usr/share/nginx/html
COPY docker/nginx.conf.test /etc/nginx/conf.d/nginx.conf.test
COPY docker/nginx.conf.pre /etc/nginx/conf.d/nginx.conf.pre
COPY docker/nginx.conf.prod /etc/nginx/conf.d/nginx.conf.prod