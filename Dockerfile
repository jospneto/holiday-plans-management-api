FROM node:alpine

WORKDIR /src

COPY ./package.json .

RUN npm install

COPY . .

EXPOSE 8080:8080

CMD [ "node", "./src/index.js" ]