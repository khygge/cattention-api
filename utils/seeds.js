const { User, Room, Cat } = require("../models");
const sequelize = require("../config/connection");

const seedDb = async () => {
  await sequelize.sync({ force: true });

  let userData = [
    {
      username: "bblaubachs",
      password: "password",
      work_time: 0,
    },
    {
      username: "bungus",
      password: "password",
      work_time: 135,
    },
  ];

  const users = await User.bulkCreate(userData);

  let placeholderRoomData = [
    {
      code: "suidhasuiodw72387akhdwq",
      UserId: 1,
    },
    {
      code: "sdsa3w72387a55kh7dwq",
      UserId: 2,
    },
    {
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
