const Sequelize = require('sequelize');
const dbConfig = require('../config/database'); // Assuming you have a separate file for database configuration
const UserModel = require('./user');
const PostModel = require('./post');

// Initialize Sequelize with database configuration
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

// Define your models
const User = UserModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);

// Define associations between models if any
User.hasMany(Post);
Post.belongsTo(User);

// Export models
module.exports = {
  sequelize,
  User,
  Post,
};
