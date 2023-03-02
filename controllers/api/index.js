const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ msg: "API route" });
});

module.exports = router;
