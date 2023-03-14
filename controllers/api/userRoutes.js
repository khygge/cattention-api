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
    const findOneUser = await User.findByPk(req.params.userId, {
      include: [Cat],
    });

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

// Creates a user and signs a token to the user.
router.post("/", async (req, res) => {
  try {
    // Creating user. Req.body should only have username & password.
    const createUser = await User.create({
      username: req.body.username,
      password: req.body.password,
      work_time: 0,
      minigame_score: 0,
      profile_badge: "rested.jpg",
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

// Finds user and signs jwt to user if username/password are correct.
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

// Update a user with user id
router.put("/:userId", async (req, res) => {
  try {
    const findUserAndUpdate = User.update(
      {
        username: req.body.username,
        work_time: req.body.work_time,
        minigame_score: req.body.minigame_score,
        profile_badge: req.body.profile_badge,
      },
      {
        where: {
          id: req.params.userId,
        },
      }
    );

    if (!findUserAndUpdate) {
      return res.status(404).json({ msg: "no such user" });
    }

    res.json({ msg: "User updated" });
  } catch (err) {
    res.status(500).json({ msg: "An error occured in update user route", err });
  }
});

router.delete("/:userId", async (req, res) => {
  try {
    const deleteUser = await User.destroy({
      where: {
        id: req.params.userId,
      },
    });
    console.log(deleteUser);

    if (!deleteUser) {
      return res.status(404).json({ msg: "No such user!" });
    }

    res.json({ msg: "User deleted", res: deleteUser });
  } catch (err) {
    res.status(500).json({ msg: "An error occured in delete user route", err });
  }
});

// Verify token against JWT secret.
router.get("/token/isValidToken", async (req, res) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ isValid: false, msg: "Invalid token." });
  }
  try {
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    // ! This will throw an error if it does not verify. We wrap it in try/catch so our API doesn't crash.
    // ! The only way for this response to be triggered is if the verify succeeds.
    res.json({
      isValid: true,
      user: tokenData,
    });
  } catch (err) {
    res.status(403).json({
      isValid: false,
      msg: "invalid token",
    });
  }
});

// Update user by adding cat
router.put("/:userId/cats/:catId", async (req, res) => {
  try {
    const foundUser = await User.findByPk(req.params.userId);
    // If no user found by ID, return with 404
    if (!foundUser) {
      return res.status(404).json({ msg: "No such user!" });
    } else {
      const addCatToUser = await foundUser.addCat(req.params.catId);
      // if this fails, return a 404 with no cat found.
      if (!addCatToUser) {
        return res.status(404).json({ msg: "No such cat!" });
      } else {
        return res.json(addCatToUser);
      }
    }
  } catch (err) {
    res
      .status(500)
      .json({ msg: "An error occured in the add cat to user route", err });
  }
});

// Add time to user from num time in the req params
router.put("/:userId/time/:numMins", async (req, res) => {
  try {
    const foundUser = await User.findByPk(req.params.userId);
    if (!foundUser) {
      return res.status(404).json({ msg: "no such user" });
    }
    let currentMinutes = parseInt(foundUser.work_time);
    let oldMinutes = currentMinutes;

    let newMinutes = (currentMinutes += parseInt(req.params.numMins));

    const updateUser = User.update(
      {
        work_time: newMinutes,
      },
      {
        where: {
          id: req.params.userId,
        },
      }
    );

    if (!updateUser) {
      return res.status(500).json({ msg: "An error occurred." });
    }
    return res.json({
      msg: "User updated",
      oldMinutes,
      newMinutes,
    });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "An error occured in the add hours to user route", err });
  }
});

// Update user's score in the database with req params
router.put("/:userId/score/:scoreNum", async (req, res) => {
  try {
    const foundUser = await User.findByPk(req.params.userId);
    if (!foundUser) {
      return res.status(404).json({ msg: "no such user" });
    }
    let currentScore = parseInt(foundUser.minigame_score);
    let oldScore = currentScore;

    let newScore = (currentScore += parseInt(req.params.scoreNum));

    const updateUser = User.update(
      {
        minigame_score: newScore,
      },
      {
        where: {
          id: req.params.userId,
        },
      }
    );

    if (!updateUser) {
      return res.status(500).json({ msg: "An error occurred." });
    }
    return res.json({
      msg: "User updated",
      oldScore,
      newScore,
    });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "An error occured in the add hours to user route", err });
  }
});

module.exports = router;
