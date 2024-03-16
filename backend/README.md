# Geo Location API

This is an example API built with Express to demonstrate GeoLocation endpoints.

## Endpoints
Find Nearest Routes

    Method: GET
    Path: /findNearestRoutes
    Summary: Find nearest routes for given location

Find Points In Viewport

    Method: GET
    Path: /findPointsInViewport
    Summary: Find points for a viewport

## Usage

1. Clone the repository and position in the backend folder.

### Local usage

2. Install dependencies: `npm install`
3. Run the application with: `node index.js`

### Docker based usage

2. Make sure to [install docker](https://docs.docker.com/engine/install/)
3. Build docker image
   - You can use: `sudo docker image build -t "geo-location-backend:<tag>" .`
   - Or use the utility script `dockerize.sh`
4. Run the docker image: `sudo docker run -d -p 5000:5000 geo-location-backend:<tag>`

## Contributors

Petar Afrić