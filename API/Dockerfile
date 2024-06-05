FROM node:16.0.0-slim

RUN mkdir /app

COPY .. /app

WORKDIR /app

RUN npm install -g nodemon
RUN npm install

EXPOSE 3000

CMD [ "nodemon", ".start" ]