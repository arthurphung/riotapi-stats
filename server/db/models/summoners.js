const Sequelize = require('sequelize')
const db = require('../db')

const Summoners = db.define('summoners', {
  summonerId: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Summoners
