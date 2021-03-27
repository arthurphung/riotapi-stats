import React from 'react'
import {connect} from 'react-redux'
import {fetchMatchDetails} from '../store/summoner'

import {Container} from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class SummonerInfoBox extends React.Component {
  componentDidMount() {
    this.props.loadMatchSet()
  }

  render() {
    console.log(this.props)
    const matchSet = this.props.summonerData.matchSet
    console.log(matchSet, 'MATCHSET DATA')

    return (
      <div>
        <Container>
          <Row>
            <div className="images">
              {matchSet.map(element => (
                <img
                  className="img"
                  key={element.id}
                  src={`http://ddragon.leagueoflegends.com/cdn/11.6.1/img/champion/${
                    element.championName
                  }.png`}
                />
              ))}
            </div>
            <Col>
              {matchSet.map(element => (
                <div className="m-5 p-4 text-center" key={element.id}>
                  {element.gameMode}
                </div>
              ))}
            </Col>
            <Col>
              {matchSet.map(element => (
                <div className="m-5 p-4 text-center" key={element.id}>
                  {element.championName}
                </div>
              ))}
            </Col>
            <Col>
              {matchSet.map(element => (
                <div className="m-5 p-4 text-center" key={element.id}>
                  {element.teamOutcome}
                </div>
              ))}
            </Col>
            <Col>
              {matchSet.map(element => (
                <div className="m-5 p-4 text-center w-100" key={element.id}>
                  {`${element.kills} / ${element.deaths} / ${element.assists}`}
                </div>
              ))}
            </Col>
          </Row>
        </Container>
        {/* <Container>
                    {matchSet.map(element => (
                        <div className="align-top" key={element.id}>
                            {element.championName}
                        </div>
                    ))}
                </Container> */}
        {/* <Container>
                    {matchSet.map(element => (
                        <img key={element.id} src={`http://ddragon.leagueoflegends.com/cdn/11.6.1/img/champion/${element.championName}.png`} />
                    ))}
                </Container> */}
        {/* <Container>
                    {matchSet.map(element => (
                        <div className="text-left" key={element.id}>
                            {element.teamOutcome}
                        </div>
                    ))}
                </Container> */}
        {/* <Container>
                    {matchSet.map(element => (
                        <div className="text-left" key={element.id}>
                            {element.kills}
                        </div>
                    ))}
                </Container>
                <Container>
                {matchSet.map(element => (
                        <div className="text-left" key={element.id}>
                            {element.deaths}
                        </div>
                    ))}
                </Container>
                <Container>
                {matchSet.map(element => (
                        <div className="text-left" key={element.id}>
                            {element.assists}
                        </div>
                    ))}
                </Container> */}
      </div>
    )
  }
}

const mapState = state => {
  return {
    summonerData: state.summoner
  }
}

const mapDispatch = dispatch => {
  return {
    loadMatchSet: () => dispatch(fetchMatchDetails())
  }
}

export default connect(mapState, mapDispatch)(SummonerInfoBox)
