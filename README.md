# Angular-PWA-App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.6.

Boilerplate generate to create a server and front to manage the push notifications. With angular and Node-express

## Install

* Install dependencias via npm or yarn

## Demo

* First you must run server (By default open on port 9000):
```
npm run server
```

* Go to src (front) and create a new build and up the server
```
ng build --prod --aot
cd dist
http-server ./angular-pwa-app -o
```

* By default will deploy in the port 8080, so you can open http://127.0.0.1:8080
and subscribe and send push notifications.
