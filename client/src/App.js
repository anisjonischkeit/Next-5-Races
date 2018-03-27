import React, { Component } from 'react';
import styled from 'styled-components';
import { getRaces } from './api'

import RaceItem from './RaceItem'
import { api_root } from './config'

import countdown from 'countdown'

const racesBuffer = 20

const RacesContainer = styled.div`
  width: 80%;
  margin: 8%;
  padding: 2%;
  border-style: solid;
  border-width: 1px;
`

const racesWithTimeUntil = races => (
  races.map(race => {
    const closingTime = new Date(race.closingTime)
    const countdownTimeSpan = countdown(closingTime)

    // base whether to remove row on the countdown to make sure
    // that the countdown doesn't end before the item is removed
    if (Date.now() > countdownTimeSpan) {
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
    if (this.state.races.length <= racesBuffer/2) {
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
      <div>
        <RacesContainer>
          { initialFetchState === "loading" && <p>loading</p> }
          { initialFetchState === "success" &&
              races.slice(0, 4).map(race => (
                <RaceItem key={race.id} closingTime={race.timeUntil} type={race.id} />
              ))
          }
        </RacesContainer>
      </div>
    );
  }
}

export default App;
