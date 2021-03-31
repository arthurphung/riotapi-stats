const Sequelize = require('sequelize')
const db = require('../db')

const Players = db.define('players', {
  teammatesId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  opponentsId: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Players
