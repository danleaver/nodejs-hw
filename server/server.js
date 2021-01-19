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



io.on("connection", (socket) => {
  let count = 0
  // socket.emit('newclientconnect', {description: "hey, welcome!"})
  socket.emit('newclientconnect', {description: count})
  
  
  // socket.emit('currentvalue', {data: count})


  let counter;

  socket.on('message', data => {
    console.log(data)


    if (data === "start") {
      clearInterval(counter)
      counter = setInterval(() => {
        if (count < 10) {
          count += 1 
        } else {
          count = 1
        }
        console.log("count:", count)
        socket.emit('newclientconnectaa', {description: count})
        // socket.emit('currentvalue', {data: count})
      }, 1000)
    } else if (data === "speedup") {
      clearInterval(counter)
      counter = setInterval(() => {
        if (count < 10) {
          count += 1 
        } else {
          count = 1
        }
        console.log("count:", count)
        socket.emit('newclientconnectaa', {description: count})
        // socket.emit('currentvalue', {data: count})
      }, 500)
    } else if (data === "stop") {
      clearInterval(counter)
    }

    // socket.emit('currentvalue', {data: count})
    // socket.emit('newclientconnect', {description: "where is this, welcome!"})


    // setInterval(() => {
    //   console.log("here")
    //   socket.emit("newclientconnect", {description: "this is being sent again"})
    // }, 500);
  })


    

});