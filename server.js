const express = require("express");
const allRoutes = require("./controllers");
const sequelize = require("./config/connection");
const models = require("./models");
const http = require("http");
const cors = require("cors");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;
//=======================================================
// Creates HTTP server
const server = http.createServer(app);

// Sets up socket.io
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// Sets up socket.io event handlers
const rooms = {};
const botName = "CATtention Bot";

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.once("join room", (roomCode, {userObject}) => {
    socket.join(roomCode);
    console.log(`${userObject.username} joined room ${roomCode}`);
    io.to(roomCode).emit("chat message", {
      message: `${botName}: ${userObject.username} has joined the room. Welcome to CATtention!`,
    });


  });

  socket.on("chat message", (data) => {
    console.log("Received message:", data.message, "from room:", data.roomCode, "at", new Date().toLocaleTimeString(), "from user:", data.userObject);
  
    // Emit the message to all clients in the same room
    io.to(data.roomCode).emit("chat message", {
      message: data.message,
      timestamp: new Date().toLocaleTimeString(),
      roomCode: data.roomCode,
      userObject: data.userObject, // Send the username back to the client
    });
  });
  

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
//=======================================================

app.use(cors())
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets up routes
app.use("/", allRoutes);




// Starts database sync and Express server
sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`);
  });
});

