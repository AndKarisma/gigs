const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
module.exports = new Sequelize('codegig', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});