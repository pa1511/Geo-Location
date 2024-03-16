// routes.js
const express = require("express");
const routesFinders = require("./models/nearest-routes-finders.js");
const pointFinders = require("./models/viewport-points-finders.js");

module.exports = function (dataProvider) {
	const router = express.Router();

	/**
	 * @swagger
	 * /findNearestRoutes:
	 *   get:
	 *     summary: Find nearest routes for given location
	 *     parameters:
	 *       - in: query
	 *         name: lng
	 *         required: true
	 *         description: location longitude
	 *       - in: query
	 *         name: lat
	 *         required: true
	 *         description: location latitude
	 *       - in: query
	 *         name: count
	 *         default: 10
	 *         required: false
	 *         description: Number of nearest routes to return
	 *     responses:
	 *       200:
	 *         description: A list of routes.
	 *       400:
	 *         description: A bad request.
	 *       500:
	 *         description: Internal server error.
	 */
	router.get("/findNearestRoutes", (req, res) => {
		const { lng, lat, count = 10 } = req.query;

		console.log(`/findNearestRoutes?lng=${lng}&lat=${lat}&count=${count}`);

		// Input validation
		let lngFloat, latFloat, countInt;
		try {
			lngFloat = parseFloat(lng);
			latFloat = parseFloat(lat);
			countInt = parseInt(count);
		} catch (error) {
			res.status(400).json({
				data: undefined,
				error: error.message,
			});
		}

		// Processing
		dataProvider
			.getRoutes()
			.then((routes) => {
				const finder = new routesFinders.SimpleNearestRoutesFinder();
				const nearestRoutes = finder.findNearestRoutes(lngFloat, latFloat, countInt, routes);
				res.status(200).json({
					data: nearestRoutes.map((r) => r.toResponseDict()),
					error: "",
				});
			})
			.catch((error) => {
				res.status(500).json({
					data: undefined,
					error: error.message,
				});
			});
	});

	/**
	 * @swagger
	 * /findPointsInViewport:
	 *   get:
	 *     summary: Find points for a viewport
	 *     parameters:
	 *       - in: query
	 *         name: lng1
	 *         required: true
	 *         description: viewport NW longitude
	 *       - in: query
	 *         name: lat1
	 *         required: true
	 *         description: viewport NW latitude
	 *       - in: query
	 *         name: lng2
	 *         required: true
	 *         description: viewport SE longitude
	 *       - in: query
	 *         name: lat2
	 *         required: true
	 *         description: viewport SE latitude
	 *     responses:
	 *       200:
	 *         description: A list of points in viewport.
	 *       400:
	 *         description: A bad request.
	 *       500:
	 *         description: Internal server error.
	 */
	router.get("/findPointsInViewport", (req, res) => {
		const { lng1, lat1, lng2, lat2 } = req.query;

		console.log(`/findNearestRoutes?lng1=${lng1}&lat1=${lat1}&lng2=${lng2}&lat2=${lat2}`);

		// Input validation
		let lng1Float, lat1Float, lng2Float, lat2Float;
		try {
			lng1Float = parseFloat(lng1);
			lat1Float = parseFloat(lat1);
			lng2Float = parseFloat(lng2);
			lat2Float = parseFloat(lat2);
		} catch (error) {
			res.status(400).json({
				data: undefined,
				error: error.message,
			});
		}

		// Processing
		dataProvider
			.getPoints()
			.then((points) => {
				const finder = new pointFinders.SimpleViewportPointsFinder();
				const pointsInView = finder.findPointsInRawViewport(lng1Float, lat1Float, lng2Float, lat2Float, points);
				res.status(200).json({
					data: pointsInView.map((p) => p.toResponseDict()),
					error: "",
				});
			})
			.catch((error) => {
				res.status(500).json({
					data: undefined,
					error: error.message,
				});
			});
	});

	return router;
};
