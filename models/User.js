const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class User extends Model {}

User.init(
  {
    user_name: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  { sequelize }
);

module.exports = User;
