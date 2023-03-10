const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const { Trivia, User, Cat, Room } = require("../../models");

// Get all questions
router.get("/", async (req, res) => {
  try {
    const allQuestions = await Trivia.findAll();
    res.json(allQuestions);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get question by ID
router.get("/:questionId", async (req, res) => {
  try {
    const oneQuestion = await Trivia.findByPk(req.params.questionId);
    if (!oneQuestion) {
      return res.status(404).json({ msg: "No such question" });
    } else {
      return res.json(oneQuestion);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create Question
router.post("/", async (req, res) => {
  try {
    const createTrivia = await Trivia.create({
      question: req.body.question,
      answers: req.body.answers,
      correct_answer: req.body.correct_answer,
    });
    res.json(createTrivia);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Returns one random question
router.get("/question/random", async (req, res) => {
  try {
    const randomQuestion = await Trivia.findOne({
      order: [sequelize.fn("RAND")],
    });
    res.json(randomQuestion);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
