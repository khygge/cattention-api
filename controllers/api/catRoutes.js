const express = require("express");
const router = express.Router();
const { User, Room, Cat } = require("../../models");

// Get all cats.
router.get("/", async (req, res) => {
  try {
    const allCats = await Cat.findAll();

    res.json(allCats);
  } catch (err) {
    res.status(500).json({ msg: "Error in the all cats route", err });
  }
});

// Get one cat by ID.
router.get("/:catId", async (req, res) => {
  try {
    const foundCat = await Cat.findByPk(req.params.catId);

    if (!foundCat) {
      res.status(404).json({ msg: "No such cat!" });
    } else {
      res.json(foundCat);
    }
  } catch (err) {
    res.status(500).json({ msg: "Error in get one cat route", err });
  }
});

// Create new cat
router.post("/", async (req, res) => {
  try {
    const createCat = await Cat.create({
      cat_name: req.body.cat_name,
      img_src: req.body.img_src,
      min_work_time: req.body.min_work_time,
    });

    res.json(createCat);
  } catch (err) {
    res.status(500).json({ msg: "Error in the cat post route", err });
  }
});

// Update cat by cat ID.
router.put("/:catId", async (req, res) => {
  try {
    const updatedCat = await Cat.update(
      {
        cat_name: req.body.cat_name,
        img_src: req.body.img_src,
        min_work_time: req.body.min_work_time,
      },
      {
        where: {
          id: req.params.catId,
        },
      }
    );

    if (updatedCat[0]) {
      return res.json(updatedCat);
    } else {
      return res.status(404).json({ msg: "No such cat!" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Error in the cat update route", err });
  }
});

module.exports = router;
