const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

const users = {};

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("register_user", (data) => {
        users[data.userId] = socket.id;
        console.log("Registered:", data.userId);
    });

    socket.on("private_message", (data) => {
        const receiverSocketId = users[data.receiverId];

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("receive_private_message", {
                senderId: data.senderType,
                message: data.message 
            });
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id); 
    });
});

server.listen(3000, () => {
    console.log("Socket server running on port 3000");
});