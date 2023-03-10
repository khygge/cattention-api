const User = require("./User");
const Cat = require("./Cat");
const Room = require("./Room");
const Trivia = require("./Trivia");

User.hasMany(Room);
Room.belongsTo(User);

User.belongsToMany(Cat, { through: "UserCat" });
Cat.belongsToMany(User, { through: "UserCat" });

module.exports = {
  User,
  Cat,
  Room,
  Trivia,
};
