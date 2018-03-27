import { api_root } from './config'

const onSuccessGetJson = (res) => {
  if (res.ok) {
    return res.json()
  } else {
    alert("Failed to fetch, make sure the server is running")
    throw Error("Failed to fetch, make sure the server is running")
  }
}

export const getRaces = async (limit) => {
  const body = new FormData()
    body.append("query", `
      {
        races(limit: ${limit}, onlyOpenRaces: true) {
          id
          closingTime
          type
          meeting {
            name
          }
        }
      }
    `)

    const jsData = await fetch(`${api_root}/graphql`, {
      method: "POST",
      body: body,
      mode: "cors"
    }).then(onSuccessGetJson)

    return jsData.data.races
}

export const getRace = async (id) => {
  const body = new FormData()
    body.append("query", `
      { 
        race(id:"${id}") {
          id
          meeting {
            name
          }
          closingTime
          type
          competitors {
            name
            positionNo
          }
        }
      }
    `)

    const jsData = await fetch(`${api_root}/graphql`, {
      method: "POST",
      body: body,
      mode: "cors"
    }).then(onSuccessGetJson)

    return jsData.data.race
}
