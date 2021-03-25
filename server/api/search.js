const router = require('express').Router()
const axios = require('axios')

const riotKey = 'RGAPI-c8830881-4d8c-4247-9fec-c9ca5ebcab46'

module.exports = router

//Get Summoner by name
router.get('/summoner', async (req, res, next) => {
  try {
    const response = await axios.get(
      'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/holobi?api_key=RGAPI-c8830881-4d8c-4247-9fec-c9ca5ebcab46'
    )
    let data = response.data
    res.json(data)
    console.log(data)
  } catch (error) {
    next(error)
  }
})
