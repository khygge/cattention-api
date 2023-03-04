const express = require("express");
const router = express.Router();
const { User, Room, Cat } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const allRooms = await Room.findAll();
    res.json(allRooms);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "An error occurred in the get all rooms route", err });
  }
});

router.get("/:roomcode", async (req, res) => {
  try {
    const foundRoom = await Room.findOne({
      where: {
        code: req.params.roomcode,
      },
    });
    if (!foundRoom) {
      return res.status(404).json({ msg: "No such room" });
    }
    res.json(foundRoom);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "An error occurred in the get one room route", err });
  }
});

module.exports = router;
