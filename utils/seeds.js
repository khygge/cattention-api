const { User, Room, Cat, Trivia } = require("../models");
const sequelize = require("../config/connection");

const seedDb = async () => {
  await sequelize.sync({ force: true });

  let userData = [
    {
      username: "bblaubachs",
      password: "password",
      work_time: 0,
      minigame_score: 0,
    },
    {
      username: "bungus",
      password: "password",
      work_time: 135,
      minigame_score: 4,
    },
  ];

  // !bulkCreate is not triggering hooks. The login route will NOT work for these users created.
  // !use the route /api/users in a POST request to make a user with the bcrypt hash.

  const users = await User.bulkCreate(userData);

  let placeholderRoomData = [
    {
      room_name: "bingus is cool",
      code: "suidhasuiodw72387akhdwq",
      UserId: 1,
    },
    {
      room_name: "Bongus?",
      code: "sdsa3w72387a55kh7dwq",
      UserId: 2,
    },
    {
      room_name: "NoooooO!",
      code: "s322sdfa55kh7dwq",
      UserId: 1,
    },
  ];

  const rooms = await Room.bulkCreate(placeholderRoomData);

  let catData = [
    {
      cat_name: "Default Cat",
      img_src: "default cat",
      min_work_time: 0,
    },
    {
      cat_name: "Supah Cat",
      img_src: "source",
      min_work_time: 60,
    },
    {
      cat_name: "Golden Catte",
      img_src: "source",
      min_work_time: 120,
    },
  ];

  const cats = await Cat.bulkCreate(catData);

  await users[0].addCat(1);
  await users[1].addCat([1, 2, 3]);

  const triviaData = [
    {
      question: "Which US city had a cat as mayor for almost 20 years?",
      answers:
        "Talkeetna, Alaska;Jacksboro, Texas;Warm River, Idaho;Gardner, Kansas",
      correct_answer: "Talkeetna, Alaska",
    },
    {
      question: "When was the first cat video recorded?",
      answers: "1952;1921;1894;1842",
      correct_answer: "1894",
    },
    {
      question: "All cats are born with what color eyes?",
      answers: "Black;Green;Blue;Brown",
      correct_answer: "Blue",
    },
    {
      question: "How many teeth does an adult cat have?",
      answers: "36;30;38;24",
      correct_answer: "30",
    },
  ];

  const createAllQuestions = await Trivia.bulkCreate(triviaData);
  process.exit(0);
};

seedDb();
