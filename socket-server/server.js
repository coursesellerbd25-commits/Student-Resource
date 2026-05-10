const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

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

app.get("/", (req, res) => {
    res.send("Socket server running");
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});