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
    socket.join(roomCode);
    console.log(`User joined room ${roomCode}`);
  });

  socket.on("chat message", (data) => {
    console.log("Received message:", data.message);

    // Emit the message to all clients in the same room
    io.to(data.roomCode).emit("chat message", {
      message: data.message,
      timestamp: new Date().toLocaleTimeString(),
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

