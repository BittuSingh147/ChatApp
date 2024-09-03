const express = require("express");
const app = express();
const http = require("http"); //Connection for socket.io
const cors = require("cors"); //error handle
const { Server } = require("socket.io");
const { log } = require("console");
app.use(cors());
const server = http.createServer(app); //this is basically a method in which we are making a connection between socket io and node.js
//this is socket io server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  //when user connected gives random id
  console.log(`user connected : ${socket.id}`);
  socket.on("send-message", (message) => {
    console.log(message);

    //Broadcast the recived message to all the connected users
    io.emit("received-message", message);
  });
  socket.on("disconnect", () => console.log("User disconnected"));
});
server.listen(5000, () => console.log("Server running at port 5000"));
