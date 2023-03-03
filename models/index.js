const User = require("./User");
const Cat = require("./Cat");

User.belongsToMany(Cat, { through: "UserCat" });
Cat.belongsToMany(User, { through: "UserCat" });

module.exports = {
  User,
  Cat,
};
