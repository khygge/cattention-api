const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Cat extends Model {}

Cat.init(
  {
    cat_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img_src: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    min_work_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize }
);

module.exports = Cat;
