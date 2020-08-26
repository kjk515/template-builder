
FROM nginx:stable-alpine

COPY storybook-static /usr/share/nginx/html/sample-storybook
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY storybook-static/index.html /usr/share/nginx/html/index.html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
