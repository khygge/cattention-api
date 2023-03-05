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

router.get("/:roomCode", async (req, res) => {
  try {
    const foundRoom = await Room.findOne({
      where: {
        code: req.params.roomCode,
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

router.post("/", async (req, res) => {
  try {
    const createdRoom = await Room.create({
      room_name: req.body.room_name,
      code: req.body.code,
      UserId: req.body.UserId,
    });
    res.json(createdRoom);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "An error occurred in the create room route", err });
  }
});

router.delete("/:roomCode", async (req, res) => {
  try {
    const deleteRoom = await Room.destroy({
      where: {
        code: req.params.roomCode,
      },
    });
    if (!deleteRoom) {
      return res.status(404).json({ msg: "No such room" });
    }
    res.json(deleteRoom);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "An error occurred in the delete room route", err });
  }
});
module.exports = router;
