const geo = require("./geo-route.js");

/**
 * Represents a simple strategy for finding points within a viewport.
 */
class SimpleViewportPointsFinder {
	findPointsInRawViewport(lng1, lat1, lng2, lat2, geoPoints) {
		const viewportPolygon = geo.TurfFactory.createRectPolygon(lng1, lat1, lng2, lat2);
		const pointsInViewport = geoPoints.filter((p) => p.intersects(viewportPolygon));
		return pointsInViewport;
	}
}

module.exports = { SimpleViewportPointsFinder };
