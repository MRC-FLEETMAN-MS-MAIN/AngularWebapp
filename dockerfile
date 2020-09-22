FROM nginx:1.17.1-alpine
COPY /dist/micro1 /usr/share/nginx/html
