const express = require("express");
const router = express.Router();
const { Trivia, User, Cat, Room } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const allQuestions = await Trivia.findAll();
    res.json(allQuestions);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:questionId", async (req, res) => {
  try {
    const oneQuestion = await Trivia.findByPk(req.params.questionId);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
