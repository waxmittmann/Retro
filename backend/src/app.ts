// import { Express } from "express";
import Express from "express";
// import Express from './Express';

// import { path } from "path";
// import { path } = require("path");
// import cookieParser from 
import * as path from 'path';
import { Thought, ThoughtType } from './thought';

// import ws = require('ws');
import { Server } from 'ws'; 
import * as WebSocket from 'ws'; 
// const ws = require('ws');

// import * as cookieParser from 'cookie-parser';
// import * as logger from 'morgan';
// import * as Logger from 'morgan';
// import * as CookieParser from 'cookie-parser';

// import { cookieParser } from 'cookie-parser';
// import logger from 'morgan';

// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = Express();
const port = 3000;
const distPath = "../../angular-retro-frontend/dist/angular-tour-of-heroes"
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use(Express.static(path.join(__dirname, distPath)));

// var router = app.Router();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('hello world')
  })

// app.get('/', async (req, res) => {
//     console.log("Hi!")
//     res.sendFile(path.resolve(__dirname, distPath, 'index.html'));
// });

app.get('/ideas', function (req, res) {
    console.log("Hi!!!")
    res.send([{
        id: 0,
        content: "first",
        type: ThoughtType.Confusing
    },{
        id: 1,
        content: "second",
        type: ThoughtType.Confusing
    },{
        id: 2,
        content: "third",
        type: ThoughtType.Confusing
    }])
})

const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// Set up a headless websocket server that prints any
// events that come in.
// const wsServer = new ws.Server({ noServer: true });
// const wsServer = new WebSocket.Server({ noServer: true });
const wsServer = new WebSocket.Server({ server });
// const wsServer = new WebSocket.Server({port: 3030});
// wsServer.on('connection', (ws: WebSocket) => {
//     console.log("Got connection")
//     ws.on('message', (message: string) => {
//         console.log(message)
//         ws.send("You sent " + message)
//     });
//     ws.send("Hi, I'm your friendly websocket server. Suck my lemons.")
// });
var lastMessage: string = "n/a"
wsServer.on('connection', (socketClient) => {
    console.log('connected');
    console.log('client Set length: ', wsServer.clients.size);

    socketClient.on('message', (message: string) => {
        console.log(message)
        socketClient.send("You sent " + message + " and message before was " + lastMessage)
        lastMessage = message
    });

    socketClient.on('close', (socketClient) => {
      console.log('closed');
      console.log('Number of clients: ', wsServer.clients.size);
    });
  });

// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
// const server = app.listen(3000);
// app.on('upgrade', (request, socket, head) => {
//   wsServer.handleUpgrade(request, socket, head, socket => {
//     wsServer.emit('connection', socket, request);
//   });
// });

module.exports = app;
