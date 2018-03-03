FROM node:9.7-alpine

RUN mkdir -p /var/www
WORKDIR /var/www

COPY ./package.json ./yarn.lock /var/app/
RUN yarn install

COPY . /var/www

ENV NODE_ENV=production
EXPOSE 8000

CMD ["next", "start", "-p", "8000"]
