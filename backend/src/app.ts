import Express from "express";
import * as path from 'path';
import { Thought, ThoughtType } from './thought';
import { Server } from 'ws'; 
import * as WebSocket from 'ws'; 

var app = Express();
const port = 3000;
const distPath = "../../frontend/dist/angular-tour-of-heroes"
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use(Express.static(path.join(__dirname, distPath)));
// app.use(Express.body)

interface Session {
    name: string;
  }


export class JoinByName {
    name: string
}

export class JoinByToken {
    token: string
}
  
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

var session: Session
var usersToTokens: Map<string, string> = new Map<string, string>()
var tokensToUsers: Map<string, string> = new Map<string, string>()

app.get('/session', function (req, res) {
    console.log("Someone's getting a session!!!")
    console.log(session)
    res.send(session)
})

app.put('/session', function (req, res) {
    console.log("Create Session!!!")
    session = { name: "My session" } 
    res.send(session)
})

app.put('/session/join', function (req, res) {
    console.log("Joining session!!!")
    if (session == null) { 
        return res.status(400).send({
            message: 'No session yet!'
         });
    }
    let token = Math.random().toString(36).substring(7)
    console.log("random", token)
    usersToTokens.set(req.body, token)
    tokensToUsers.set(token, req.body)
    // res.send(session)
    res.send({ "session": session, "token": token})
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
