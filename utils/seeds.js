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
      cat_name: "Rested Cat",
      img_src: "rested.jpg",
      min_work_time: 0,
    },
    {
      cat_name: "Collab Cats",
      img_src: "cat collab.jpg",
      min_work_time: 30,
    },
    {
      cat_name: "Game Master",
      img_src: "game master.jpg",
      min_work_time: 60,
    },
    {
      cat_name: "High Score",
      img_src: "high score.jpg",
      min_work_time: 100,
    },
    {
      cat_name: "Scholar Cat",
      img_src: "scholarly.jpg",
      min_work_time: 600,
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
    {
      question: "What part of a cat is as unique as a human fingerprint?",
      answers: "Paws;Ears;Nose;Eyes",
      correct_answer: "Nose",
    },
    {
      question: "A cat can't taste ____ flavors.",
      answers: "Sour;Sweet;Bitter;Salty",
      correct_answer: "Sweet",
    },
    {
      question: "What breed of cat has a reputation for being cross-eyed?",
      answers: "Maine Coon;Siamese;Persian;Turkish Angora",
      correct_answer: "Siamese",
    },
    {
      question: "How old was the world's oldest cat?",
      answers: "22 Years;27 Years;34 Years;38 Years",
      correct_answer: "38 Years",
    },
    {
      question: "How much did the world's heaviest cat weigh?",
      answers: "47 lbs;22 lbs;35 lbs;28 lbs",
      correct_answer: "47 lbs",
    },
    {
      question: "What breed of cat has no tail?",
      answers: "Manx;Bobcat;Highlander;Lynx",
      correct_answer: "Manx",
    },
    {
      question: "How many cats did Abraham Lincoln have in the white house?",
      answers: "1;7;4;3",
      correct_answer: "4",
    },
    {
      question: "What percent of people identify as cat people?",
      answers: "28.7%;82.9%;11.5%;53.2%",
      correct_answer: "11.5%",
    },
    {
      question: "What is the smallest breed of cat?",
      answers: "Sphinx;Cornish rex;Singapura;Siamese",
      correct_answer: "Singapura",
    },
    {
      question: "What cartoon cat loved lasagna?",
      answers: "Tom;Garfield;Sylvester;Felix",
      correct_answer: "Garfield",
    },
    {
      question: "What is a female cat called?",
      answers: "A lady;A queen;A kate;A princess",
      correct_answer: "A queen",
    },
    {
      question: "What is the fastest cat in Africa?",
      answers: "Cheeta;Lion;Panther;Bobcat",
      correct_answer: "Cheeta",
    },
    {
      question: "What is a group of cats called?",
      answers: "Chowder;Cluster;Felis;Clowder",
      correct_answer: "Clowder",
    },
  ];

  const createAllQuestions = await Trivia.bulkCreate(triviaData);

  process.exit(0);
};

seedDb();
