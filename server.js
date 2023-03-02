const express = require("express");
const allRoutes = require("./controllers");

const sequelize = require("./config/connection");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", allRoutes);

sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log(`API running at http://localhost:${PORT}`);
  });
});
