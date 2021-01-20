const express = require('express');
const path = require('path');
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4000;

const app = express()
const server = http.createServer(app)
const io = socketIo(server); 

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/build/index.html'));
});

server.listen(port, () => console.log(`Listening on port ${port}`));

  let count = 0
  let counter;
  let running = false;

io.on("connection", (socket) => {
  socket.emit("runningStatus", {running})

  socket.on('message', data => {
    switch (data) {
      case "0":
        clearInterval(counter);
        running = false
        socket.emit("runningStatus", {running})
        socket.broadcast.emit("runningStatus", {running})
        break;
      case data:
        clearInterval(counter)
        running = true
        socket.emit("runningStatus", {running})
        socket.broadcast.emit("runningStatus", {running})
        
        counter = setInterval(() => {
          if (count < 10) {
            count += 1 
          } else {
            count = 1
          }
          console.log("count:", count)
          socket.emit('counterConnect', {description: count})
          socket.broadcast.emit('counterConnect', {description: count})
        }, 2500 - 100 * parseInt(data))
      break;
        default:
          clearInterval(counter);
    }
  })
});
