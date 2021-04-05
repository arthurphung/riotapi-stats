const Sequelize = require('sequelize')
const db = require('../db')

const PlayerDetails = db.define('playerdetails', {
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
  },
  champLevel: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  spell1: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  spell2: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  item0: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  item1: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  item2: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  item3: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  item4: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  item5: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  item6: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  teammate1: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  teammate2: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  teammate3: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  teammate4: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  teammate5: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  opponent1: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  opponent2: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  opponent3: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  opponent4: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  opponent5: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  summonerName: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  profileIconId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = PlayerDetails
