const Sequelize = require('sequelize');
require('dotenv').config();

// Create Sequelize instance
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

// Define User model
const User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    // Add more fields as needed
});

// Define Post model
const Post = sequelize.define('post', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    // Add more fields as needed
});

// Define associations between models
User.hasMany(Post); // A user can have many posts
Post.belongsTo(User); // A post belongs to a user

// Sync models with database
sequelize.sync()
    .then(() => {
        console.log('Database synced');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });

module.exports = {
    sequelize,
    User,
    Post
};
