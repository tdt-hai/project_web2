const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const database = 'bank';
const username = 'postgres';
const password='123456';
const hosts = 'localhost';
const port = '5432'

const connectionString = process.env.DATABASE_URL || 'postgres://'+ username+':'+password+'@' + hosts + ':' + port + '/'+ database
const db = new Sequelize(connectionString);
module.exports = db;
