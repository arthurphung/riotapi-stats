const router = require('express').Router()
const axios = require('axios')
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
    let {accId} = req.query
    console.log('account id here ==>', accId)
    let url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accId}?api_key=${riotKey}`

    const response = await axios.get(url)
    let matches = response.data
    res.json(matches)
    // console.log(matches)
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
