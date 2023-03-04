const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Cat, Room } = require("../../models");

router.get("/", async (req, res) => {
  const findAllUsers = await User.findAll();

  res.json(findAllUsers);
});

router.get("/:userId", async (req, res) => {
  const findOneUser = await User.findByPk(req.params.userId);

  if (!findOneUser) {
    res.status(404).json({ msg: "No such user" });
  } else {
    res.json(findOneUser);
  }
});

module.exports = router;
