const router = require('express').Router()
const axios = require('axios')
const {PlayerDetails, Summoners} = require('../db/models')
require('dotenv').config()

const riotKey = process.env.API_KEY

module.exports = router

//Get Summoner by name
router.get('/summoner', async (req, res, next) => {
  try {
    let {username} = req.query
    console.log('username here ==>', username)
    let url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${riotKey}`

    const response = await axios.get(url)
    let data = response.data
    res.json(data)
    console.log(data)
  } catch (error) {
    next(error)
  }
})

//Get Match-list for games played on given account ID
router.get('/matches', async (req, res, next) => {
  try {
    console.log(req.query.summonerName)
    const findSummoner = await PlayerDetails.findOne({
      where: {summonerName: req.query.summonerName}
    })
    if (findSummoner) {
      res.json('Summoner exists')
    } else {
      let {accountId} = req.query
      console.log('account id here ==>', accountId)
      let url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?api_key=${riotKey}`

      const response = await axios.get(url)
      let matches = response.data
      res.json(matches)
    }
  } catch (error) {
    next(error)
  }
})

//Get Game Details for specific matches
router.get('/gameDetails', async (req, res, next) => {
  try {
    let {gameId} = req.query
    console.log('game id here ==>', gameId)
    let url = `https://na1.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${riotKey}`

    const response = await axios.get(url)
    let data = response.data
    res.json(data)
    // console.log(data)
  } catch (error) {
    next(error)
  }
})

//Post Game Details for 10 matches
router.post('/gameDetails', async (req, res, next) => {
  try {
    const createdPlayerBlock = await PlayerDetails.create(req.body)
    res.json(createdPlayerBlock)
  } catch (error) {
    next(error)
  }
})

//Post Summoner Name for User model
router.post('/summoner', async (req, res, next) => {
  try {
    console.log(req.body)
    const createdSummonerName = await Summoners.create(req.body)
    res.json(createdSummonerName)
  } catch (error) {
    next(error)
  }
})

//Get specific user's match history
router.get('/:summonerId', async (req, res, next) => {
  try {
    console.log(req.params.summonerId)
    const userMatchSet = await PlayerDetails.findAll({
      where: {
        summonerName: req.params.summonerId
      }
    })
    res.json(userMatchSet)
  } catch (error) {
    next(error)
  }
})
