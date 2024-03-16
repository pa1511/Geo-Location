const turf = require("@turf/turf");


/**
 * Represents a geographic route.
 */
class GeoRoute {
	constructor(id, points) {
		this.id = id;
		this.points = points;
	}

	calculateDistanceToRawCoordinate(lng, lat) {
		const targetPoint = TurfFactory.createPoint(lng, lat);
		return this.calculateDistanceToCoordinate(targetPoint);
	}

	calculateDistanceToCoordinate(coordinate) {
		const distances = this.points.map((p) => p.calculateDistanceToCoordinate(coordinate));
		return Math.min(...distances);
	}

	toResponseDict() {
		return {
			id: this.id,
			points: this.points.map((p) => p.toResponseDict()),
		};
	}
}


/**
 * Represents a geographic point.
 */
class GeoPoint {
	constructor(id, region) {
		this.id = id;
		this.region = region;
	}

	calculateDistanceToRawCoordinate(lng, lat) {
		const targetPoint = TurfFactory.createPoint(lng, lat);
		return this.calculateDistanceToCoordinate(targetPoint);
	}

	calculateDistanceToCoordinate(coordinate) {
		return this.region.calculateDistanceToCoordinate(coordinate);
	}

	intersectsRaw(lng1, lat1, lng2, lat2) {
		return this.region.intersectsRaw(lng1, lat1, lng2, lat2);
	}

	intersects(polygon) {
		return this.region.intersects(polygon);
	}

	toResponseDict() {
		return {
			id: this.id,
			region: this.region.toResponseDict(),
		};
	}
}


/**
 * Represents a geographic region.
 */
class GeoRegion {
	constructor(coordinates) {
		this.coordinates = coordinates;
		this.polygon = TurfFactory.createPolygon(coordinates);
	}

	calculateDistanceToRawCoordinate(lng, lat) {
		const targetPoint = TurfFactory.createPoint(lng, lat);
		return this.calculateDistanceToCoordinate(targetPoint);
	}

	calculateDistanceToCoordinate(coordinate) {
		const vertices = turf.explode(this.polygon);
		const closestVertex = turf.nearest(coordinate, vertices);
		return turf.distance(coordinate, closestVertex);
	}

	intersectsRaw(lng1, lat1, lng2, lat2) {
		const polygon = TurfFactory.createRectPolygon(lng1, lat1, lng2, lat2);
		return this.intersects(polygon);
	}

	intersects(polygon) {
		const intersection = turf.intersect(this.polygon, polygon);
		if (intersection) {
			return true;
		}
		return false;
	}

	toResponseDict() {
		return this.coordinates;
	}
}


/**
 * Factory class for creating geographic objects.
 */
class GeoFactory {
	static createRoute(rawRoute) {
		const id = rawRoute.id;
		const points = rawRoute.pointsOnRoutes.map((rawPoint) => GeoFactory.createPoint(rawPoint));
		return new GeoRoute(id, points);
	}

	static createPoint(rawPoint) {
		const id = rawPoint.point.id;
		const region = GeoFactory.createRegion(rawPoint.point.region);
		return new GeoPoint(id, region);
	}

	static createRegion(rawRegion) {
		const coordinates = rawRegion.geometry.coordinates;
		return new GeoRegion(coordinates);
	}
}


/**
 * Factory class for creating geographic objects using the Turf.js library.
 */
class TurfFactory {
	static createPoint(lng, lat) {
		return turf.point([lng, lat]);
	}

	static createPolygon(coordinates) {
		return turf.polygon(coordinates);
	}

	static createRectPolygon(lng1, lat1, lng2, lat2) {
		return turf.polygon([
			[
				[lng1, lat1],
				[lng1, lat2],
				[lng2, lat2],
				[lng2, lat1],
				[lng1, lat1],
			],
		]);
	}
}

module.exports = { GeoRoute, GeoPoint, GeoRegion, GeoFactory, TurfFactory };
