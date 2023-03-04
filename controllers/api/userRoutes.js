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
    return res.status(404).json({ msg: "No such user" });
  } else {
    return res.json(findOneUser);
  }
});

router.post("/", async (req, res) => {
  const createUser = await User.create({
    username: req.body.username,
    password: req.body.password,
    work_time: 0,
  });

  res.json(createUser);
});

router.post("/login", async (req, res) => {
  const findOneUser = await User.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (!findOneUser) {
    return res.status(401).json({ msg: "Invalid credentials." });
  } else if (!bcrypt.compareSync(req.body.password, findOneUser.password)) {
    return res.status(401).json({ msg: "Invalid credentials." });
  } else {
    const token = jwt.sign(
      {
        id: findOneUser.id,
        username: findOneUser.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "12h",
      }
    );

    return res.json({ token: token, user: findOneUser });
  }
});

module.exports = router;
