const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
router.use("/users", userRoutes);

const roomRoutes = require("./roomRoutes");
router.use("/rooms", roomRoutes);

router.get("/", async (req, res) => {
  res.json({ msg: "API route" });
});

module.exports = router;
