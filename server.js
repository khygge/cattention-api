const express = require("express");
const allRoutes = require("./controllers");
const sequelize = require("./config/connection");
const models = require("./models");
const http = require("http");

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
io.on("connection", (socket) => { //user connects
  console.log("a user connected");

  socket.on("disconnect", () => { //user disconnects
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => { // Broadcast the incoming message to all clients
    io.emit("chat message", msg);
    console.log("chat message: " + msg);
  });
});
//=======================================================

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
