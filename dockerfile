FROM nginx:1.17.1-alpine
COPY /micro1/micro1 /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
RUN chown nginx:nginx ./*
