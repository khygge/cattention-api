const express = require("express");
const router = express.Router();
const { User, Room, Cat } = require("../../models");

router.get("/", async (req, res) => {
  const allCats = await Cat.findAll();

  res.json(allCats);
});

router.get("/:catId", async (req, res) => {
  const foundCat = await Cat.findByPk(req.params.catId);

  if (!foundCat) {
    res.status(404).json({ msg: "No such cat!" });
  } else {
    res.json(foundCat);
  }
});

module.exports = router;
