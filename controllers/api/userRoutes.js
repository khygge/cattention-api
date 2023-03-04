const express = require("express");
const router = express.Router();
const { User, Cat, Room } = require("../../models");

router.get("/", async (req, res) => {
  const findAllUsers = await User.findAll();

  res.json(findAllUsers);
});

module.exports = router;
