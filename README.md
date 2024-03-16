# Geo Location

This project is a small geo location application.

It consists of a small React frontend and a small Express backend. 

The frontend displays an interactive map. 
It renders points within the viewport and highlights points belonging to the closest route in red when you click on a location.

The backend provides geo location endpoints to find routes closest to a given location and to find points within a given viewport. 

## Usage

In [backend](backend/) you have detailed instructions for running the application backend. 
In [frontend](frontend/) you have detailed instructions for running the application frontend. 
If you use Docker, make sure to start the backend before the frontend. Otherwise the nginx server which serves the frontend and functions as a reverse proxy to the backend won't be able to find the backend.

NOTE: Use the same usage type for frontend and for backend!

If you decide to use docker, after building the images, you can run both frontend and backend using docker-compose:
`sudo docker-compose up`

### Quick local guide

1. Clone the repository
2. Backend
   - `cd backend/`
   - `npm install`
   - `node index.js`
3. Frontend
   - `cd ../frontend/`
   - `npm install`
   - `npm start`

### Quick docker guide

1. Clone the repository
2. Backend
   - `cd backend/`
   - `dockerize.sh`
3. Frontend
   - `cd ../frontend/`
   - `dockerize.sh`
4. Run at once:
   - `cd ..`
   - `sudo docker-compose up`

NOTE: docker-compose assumes both image tags to be 1.0.0!

## Contributors

Petar Afrić

## Showcase

![Geo Location UI](docs/images/goe-location-example.gif)

![Geo Location API Swagger](docs/images/geo-loc-swagger.png)