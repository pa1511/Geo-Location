const geo = require("./geo-route.js");

/**
 * Represents a simple strategy for finding routes nearest to a location.
 */
class SimpleNearestRoutesFinder {
	findNearestRoutes(lng, lat, count, geoRoutes) {
		const location = geo.TurfFactory.createPoint(lng, lat);
		const routesWithDistance = geoRoutes.map((r) => {
			const distance = r.calculateDistanceToCoordinate(location);
			return {
				distance: distance,
				route: r,
			};
		});
		routesWithDistance.sort((a, b) => a.distance - b.distance);

		return routesWithDistance.slice(0, Math.min(count, routesWithDistance.length)).map((e) => e.route);
	}
}

module.exports = { SimpleNearestRoutesFinder };
