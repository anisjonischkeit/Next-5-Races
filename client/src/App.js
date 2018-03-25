import React, { Component } from 'react';
import { api_root } from './config'

class App extends Component {
  state = {
    fetchState: "loading",
    races: []
  }

  async componentDidMount() {
    const body = new FormData()
    body.append("query", `
      {
        races(limit: 4) {
          id
          closingTime
          type
        }
      }
    `)

    const jsData = await fetch(`${api_root}/graphql`, {
      method: "POST",
      body: body
    }).then(res => res.json())

    this.setState(state => ({
      races: jsData.data.races,
      fetchState: "success"
    }))

  }

  render() {
    const { races } = this.state
    return (
      <div>
        <ul>
          {races.map(race => <li key={race.id} href={`/races/${race.id}`}>{race.type}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
