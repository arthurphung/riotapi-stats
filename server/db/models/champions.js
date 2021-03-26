const Sequelize = require('sequelize')
const db = require('../db')

const Champions = db.define('champions', {
  championId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  championName: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Champions
