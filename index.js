const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");


const server=http.createServer(app);


const io = new Server(server, {
    cors: {
      origin: "https://roaring-frangollo-4f8bbf.netlify.app",
      methods: ["GET", "POST"],
    },
  });
  
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data) => {
        console.log("JOINED");
      socket.join(data);
    });
    
    socket.on("send_message", (data) => {
        console.log(data);
        io.to(data.roomid).emit("receive_message", data);
        //socket.to(data.roomid).emit("receive_message", data);
      });
  });
  
  server.listen(process.env.port || 3001, () => {
    console.log("SERVER IS RUNNING");
  });