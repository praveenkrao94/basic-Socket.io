const express = require("express");
const app = express()

const http = require('http')

const cors = require('cors')

const { Server } = require("socket.io")

app.use(cors())

const server = http.createServer(app)

const io = new Server(server , {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST" , "PUT", "DELETE" , "PATCH"],
    }
})

io.on("connection" , (socket)=> {    //~ so socket response on event so when someone connected to the server 
    console.log(`User Connected : ${socket.id}`);

    socket.on("join_room",(data)=> {
        console.log(data , ' room id')
        socket.join(data);      //~ .join is to join a  room
        console.log("user with id:" + socket.id +" joined room :" + data)
    })

    socket.on("send_message" , (data)=> {
        socket.to(data.room).emit("receive_message" , data);  //~ .to is to join a room and emit the message

    })
    socket.on("disconnect" , ()=> {
        console.log(`User disConnected : ${socket.id}`);
    })

 
})

server.listen(4000, () => 
console.log('Server running on port 4000')
)


