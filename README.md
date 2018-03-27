## Starting The API Server

To start up the server, simply run

```
docker-compose up
```

## Viewing the API

Viewing the API is easy. Simply visit [localhost:8001/graphql](http://localhost:8001/graphql)

There are docs that describe the usage of the API

## Starting the front-end

To start the front-end:

```
cd client
yarn install
yarn start
```

## Implementation Details

The way in which the web app keeps its data up to date is it keeps a buffer of the
next 20 races and simply displays the first 5. Every second the time till race close 
is recalculated. If the race is closed it is removed from the list.

Once the buffer is half empty (10 races left) another api call is made to get the next 20 races.

## Current Limitations

An issue may occur If the servers time becomes out of sync with the client's time. When the next
set of races comes in (because the buffer is running low) a race may be removed before its countdown
completes. This is because the server has registered that the event is already over.

Docker has a tendancy to slowly become out of sync when the machine goes to sleep so make sure
to restart docker before running the app

### Restarting Docker

#### On linux using systemctl
```
sudo systemctl restart docker
```

#### On windows

right click on the docker icon in your task bar and click restart

#### On Mac

right click on the docker icon in your task bar and click restart