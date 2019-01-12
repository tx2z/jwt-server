FROM node:8

WORKDIR /app 

COPY package.json package.json

COPY package-lock.json package-lock.json

RUN npm install

COPY . . 

EXPOSE 5000 

RUN npm install -g nodemon 

CMD [ "nodemon", "src/server.js" ] 