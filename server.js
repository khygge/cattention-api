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

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join room", (roomCode) => {
    if (!rooms[roomCode]) {
      rooms[roomCode] = [];
    }

    rooms[roomCode].push(socket.id);
    socket.join(roomCode);

    console.log(`User ${socket.id} joined room ${roomCode}`);
  });

  socket.on("leave room", (roomCode) => {
    if (rooms[roomCode]) {
      rooms[roomCode] = rooms[roomCode].filter((id) => id !== socket.id);
      socket.leave(roomCode);

      console.log(`User ${socket.id} left room ${roomCode}`);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");

    Object.entries(rooms).forEach(([roomCode, sockets]) => {
      rooms[roomCode] = sockets.filter((id) => id !== socket.id);
      socket.leave(roomCode);
    });
  });

  socket.on("chat message", ({ roomCode, message }) => {
    if (rooms[roomCode]) {
      const currentTime = new Date();
      const timestamp = currentTime.toLocaleTimeString();
      const fullMessage = `[${timestamp}] ${message}`; // Add timestamp to message
  
      io.to(roomCode).emit("chat message", { msg: fullMessage, timestamp });
      console.log(`Chat message "${fullMessage}" sent to room ${roomCode}`);
    }
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

