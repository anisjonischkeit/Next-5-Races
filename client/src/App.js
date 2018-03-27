import React, { Component } from 'react';
import styled from 'styled-components';
import { getRaces } from './api'

import RaceItem from './RaceItem'
import { api_root } from './config'

import countdown from 'countdown'

const racesBuffer = 20

const Application = styled.div`
  font-family: sans-serif
  color: white
`

const RacesContainer = styled.div`
  width: 80%;
  padding: 0 10%;
`

const Title = styled.h1`
  text-align: center
  padding: 40px 0
`



const racesWithTimeUntil = races => (
  races.map((race) => {
    const closingTime = new Date(race.closingTime)
    const countdownTimeSpan = countdown(closingTime)

    if (countdownTimeSpan.value >= -500) {
      return null
    } else {
      // dont manipulate the state
      const newRace = { ...race }

      newRace["timeUntil"] = countdownTimeSpan.toString()
      return newRace
    }
  }).filter(race => race !== null)
)

class App extends Component {
  state = {
    initialFetchState: "loading",
    races: [],
    timeTillRaces: []
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.initialFetchState === "success" && this.state.races.length <= racesBuffer/2) {
      this.getLatestRaces()
    }
  }

  async componentDidMount() {
    this.getLatestRaces()

    setInterval(() => {
      this.setState((state) => ({
        ...state,
        races: racesWithTimeUntil(state.races)
      }))
    }, 1000)
  }

  async getLatestRaces() {
    const races = await getRaces(racesBuffer)
    
    this.setState(state => ({
      races: racesWithTimeUntil(races),
      initialFetchState: "success"
    }))
  }

  render() {
    const { races, initialFetchState } = this.state
    return (
      <Application>
        <Title>Next 5 Races</Title>
        <RacesContainer>
          { initialFetchState === "loading" && <p>loading</p> }
          { initialFetchState === "success" &&
              races.slice(0, 5).map(race => (
                <RaceItem key={race.id} closingTime={race.timeUntil} title={race.meeting.name}/>
              ))
          }
        </RacesContainer>
      </Application>
    );
  }
}

export default App;
