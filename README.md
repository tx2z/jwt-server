# jwt-server

This is a ready to use JSON WEB TOKEN (https://jwt.io/) based Authentification server.

It's based on https://devdactic.com/jwt-authentication-ionic-node/

## Deploy using Docker-compose

For more convenience everything have been dockerized and a docker-compose file have been created to easy deploy the server.

Just change the JWTSECRET in [dotenv-sample](./dotenv-sample) and rename the file to ".env"

and launch docker-compose.

``` bash
docker-compose up -d
```

Optionally, change the [Caddyfile](./Caddyfile) to add your domain (by default it exposes the port 80):

``` Caddyfile
<yourdomain.com> {
    proxy / app:5000 {
        websocket
    }
}

```

## Using node locally

Install mongodb and execute it: https://docs.mongodb.com/manual/administration/install-community/

Edit the file [dotenv-sample](./dotenv-sample) adding the correct configuration for your environment and rename the file to ".env"

Then you can run the server using:

``` bash
node src/server.js
npm start
```

Or use [nodemon](https://nodemon.io/)

``` bash
npm install -g nodemon
nodemon src/server.js
```