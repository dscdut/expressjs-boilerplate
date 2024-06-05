'use strict';
import { Sequelize } from 'sequelize';
import appConfig from './app.config';

const {
  db: { host, port, database, username, password, dialect },
} = appConfig;

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

class Database {
  constructor() {
    this.connect();
  }

  async connect() {
    try {
      await sequelize.authenticate();
      console.log('Connected to the database');
    } catch (error) {
      console.error('Error connecting to the database:', error.message);
    }
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instancePostgresdb = Database.getInstance();
export default instancePostgresdb;
