import axios from 'axios'
const FIND_SUMMONER = 'FIND_SUMMONER'

export const summonerName = summoner => ({
  type: FIND_SUMMONER,
  summoner
})

export const fetchSummonerByName = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/search/summoner')
      dispatch(summonerName(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {
  summonerName: []
}

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function summonerReducer(state = initialState, action) {
  switch (action.type) {
    case FIND_SUMMONER: {
      return {...state, summonerName: action.summoner}
    }
    default:
      return state
  }
}
