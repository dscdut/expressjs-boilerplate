'use strict';
import config from '@/config/app.config';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const {
  db: { host, port, database, username, password, dialect },
} = config;
const db = {};

let sequelize;
const customizeConfig = {
  host: host,
  port: port,
  dialect: dialect,
  logging: false,
  query: {
    raw: true,
  },
  timezone: '+07:00',
};

sequelize = new Sequelize(database, username, password, customizeConfig);

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js' && file.indexOf('.test.js') === -1;
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
