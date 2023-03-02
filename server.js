const express = require("express");
const allRoutes = require("./controllers");

const sequelize = require("./config/connection");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;

//==============================================================
// Socket.io for chat feature


const server = app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});

const io = require('socket.io')(server);
const SOCKET_PORT = 3002;

io.listen(SOCKET_PORT, () => {
  console.log(`Socket.io running at http://localhost:${SOCKET_PORT}`);
});

io.on('connection', (socket) => {
  console.log('a user connected');  

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
//==============================================================

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", allRoutes);

sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log(`API running at http://localhost:${PORT}`);
  });
});
