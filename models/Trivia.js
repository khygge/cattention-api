const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Trivia extends Model {}

Trivia.init(
  {
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answers: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correct_answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize }
);

module.exports = Trivia;
