# Geo Location API

This project is a small React frontend that displays an interactive map. It renders points within the viewport and highlights points belonging to the closest route in red when you click on a location.

## Features

Displays an interactive map.
Renders points within the viewport.
Highlights points belonging to the closest route when you click on a location.

## Usage

1. Clone the repository and position in the frontend folder.

### Local usage

2. Install dependencies: `npm install`
3. Run the application with: `npm start`

### Docker based usage

2. Make sure to [install docker](https://docs.docker.com/engine/install/)
3. Build docker image
   - You can use: `sudo docker image build -t "geo-location-frontend:<tag>" .`
   - Or use the utility script `dockerize.sh`
4. Run the docker image: `sudo docker run -d -p 3000:3000 geo-location-frontend:<tag>`

## Contributors

Petar Afrić