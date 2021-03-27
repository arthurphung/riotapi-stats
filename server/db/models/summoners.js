const Sequelize = require('sequelize')
const db = require('../db')

const Summoners = db.define('summoners', {
  gameId: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  gameMode: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  championName: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  teamOutcome: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  kills: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  deaths: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  assists: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Summoners
