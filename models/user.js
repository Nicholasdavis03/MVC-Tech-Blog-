const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true // Ensures each username is unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return User;
};
