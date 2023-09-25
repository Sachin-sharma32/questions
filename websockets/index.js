const express = require("express");
// ws1 -> we cannot use express to create websocket server so we use http
const http = require("http");

const path = require("path");

const app = express();
const server = http.createServer(app);

// ws4
const { Server } = require("socket.io");
// ws5
const io = new Server(server);

// ws6 -> when a "connection" event is established, a callback function is called
// "socket" -> each client is called a socket
io.on("connection", (socket) => {
  // ws7 -> each socket has a unique id
  console.log("connected with id: ", socket.id);

  // ws12
  socket.on("messageToServer", (message) => {
    console.log(message);
    // ws13 -> server now sends the message to all the sockets
    io.emit("messageToClient", message);
  });
});

app.get("/", (req, res) => {
  // ws2
  res.sendFile(path.join(__dirname, "public/index.html"));
});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});

// ws3 -> npm i socket.io
