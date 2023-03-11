const express = require("express");
const router = express.Router();

const apiRoutes = require("./api");
router.use("/api", apiRoutes);

router.get("/", async (req, res) => {
  res.json({ msg: "Wrong Route!" });
});

module.exports = router;
