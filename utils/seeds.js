const { User, Room, Cat } = require("../models");
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

  process.exit(0);
};

seedDb();
