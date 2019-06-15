# ChatClient

As a programmer I like to keep learning the latest technologies and what better way than creating something where one can apply them?

I wanted to learn something about WebSockets and I thought a chat application would be fun to develop, I also wanted to try the Progressive Web Apps (PWA) capacities of Angular which have improved a lot since Angular 5, making it really easy to create a PWA.

In this post I give details on how I implemented a chat application using WebSockets, specifically the Socket.IO library which enables real-time bidirectional event-based communication.

## Chat Backend

I first started with the guide to create a basic chat from Socket.io https://socket.io/get-started/chat/ for the server side. The Chat server was developed using Node, Express, Typescript, Socket.io, gulp, and deployed on Heroku.

The repository for the backend is hosted in Github:

https://github.com/meiordac/chat-server

## Chat Frontend

The frontend application was developed using Angular, Angular Material, and it obviously attempts to be a Progressive Web App, it implements Angular Service Worker and include a manifest.json.

To use the Angular Service worker we have to run

`npm install —save @angular/service-worker`

then we have to activate the service worker so that the angular-cli knows that we want to use a service worker.

`ng set apps.0.serviceWorker=true`

import the ServiceWorkerModule in our app.module and finally add a manifest file ngsw-config.json.

Finally I created a manifest.json following the The Web App Manifest being careful to add the manifest.json to the list of assets in my .angular-cli.json file so that it gets copied when deploying.

## Frontend features

Angular
Angular Material
Angular Service Worker
Manifest.json
Automated testing with Karma
Source Code
Find the complete project in this GitHub repository:

https://meiordac.github.io/chat-client/

## Live Demo

The final version of the chat client is deployed in

https://meiordac.github.io/chat-client/
