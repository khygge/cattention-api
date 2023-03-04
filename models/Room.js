const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Room extends Model {}

Room.init(
  {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize }
);

module.exports = Room;
