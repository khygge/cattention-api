const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Cat, Room } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const findAllUsers = await User.findAll();

    res.json(findAllUsers);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "An error occurred in the get all users route", err });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const findOneUser = await User.findByPk(req.params.userId);

    if (!findOneUser) {
      return res.status(404).json({ msg: "No such user" });
    } else {
      return res.json(findOneUser);
    }
  } catch (err) {
    res
      .status(500)
      .json({ msg: "An error occurred in the get one user route", err });
  }
});

router.post("/", async (req, res) => {
  try {
    // Creating user. Req.body should only have username & password.
    const createUser = await User.create({
      username: req.body.username,
      password: req.body.password,
      work_time: 0,
    });

    // Sign token and attach it in an object to send back.
    const token = jwt.sign(
      {
        id: createUser.id,
        username: createUser.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "12h",
      }
    );
    res.json({
      token: token,
      user: createUser,
    });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "An error occured in user creation route", err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const findOneUser = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!findOneUser) {
      // ! No found user.
      return res.status(401).json({ msg: "Invalid credentials." });
    } else if (!bcrypt.compareSync(req.body.password, findOneUser.password)) {
      // ! Incorrect password.
      return res.status(401).json({ msg: "Invalid credentials." });
    } else {
      // Password and username are correct at this point.
      // Sign token and attach it in an object to send back.
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
  } catch (err) {
    res.status(500).json({ msg: "An error occured in user login route", err });
  }
});

module.exports = router;
