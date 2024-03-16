const geo = require("./geo-route.js");

class UniquePointsFinder {
	/**
	 * Finds unique points from a list of routes.
	 * @param {Array<geo.GeoRoute>} routes - The list of routes.
	 * @returns {Array<geo.GeoPoint>} - An array of unique points.
	 */
	static findUniquePoints(routes) {
		const seenPointIds = new Set();
		const uniquePoints = [];
		routes.forEach((route) => {
			route.points.forEach((point) => {
				if (!seenPointIds.has(point.id)) {
					seenPointIds.add(point.id);
					uniquePoints.push(point);
				}
			});
		});
		return uniquePoints;
	}
}

/**
 * Represents a data provider for retrieving routes and points.
 */
class DataProvider {
	/**
	 * @param {string} url - The URL from which the data is loaded.
	 */
	constructor(url) {
		this.url = url;
	}

	/**
	 * Retrieves routes from the data provider.
	 * @returns {Promise<Array<geo.GeoRoute>>} - A promise resolving to an array of routes.
	 */
	getRoutes() {
		return fetch(this.url)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				return data.map((item) => geo.GeoFactory.createRoute(item));
			})
			.catch((error) => {
				throw new Error("There was a problem with the fetch operation:", error.message);
			});
	}

	/**
	 * Retrieves points from the data provider.
	 * @returns {Promise<Array<geo.GeoPoint>>} - A promise resolving to an array of unique points.
	 */
	getPoints() {
		return this.getRoutes().then((routes) => UniquePointsFinder.findUniquePoints(routes));
	}
}

/**
 * Decorates a data provider to cache results.
 */
class CacheDataProvider {
	constructor(dataProvider) {
		this.dataProvider = dataProvider;
		this.routesCache = null;
		this.pointsCache = null;
	}

	/**
	 * Retrieves routes from the data provider.
	 * @returns {Promise<Array<geo.GeoRoute>>} - A promise resolving to an array of routes.
	 */
	getRoutes() {
		if (this.routesCache) {
			return Promise.resolve(this.routesCache);
		}
		return this.dataProvider.getRoutes().then((data) => {
			this.routesCache = data;
			return data;
		});
	}

	/**
	 * Retrieves points from the data provider.
	 * @returns {Promise<Array<geo.GeoPoint>>} - A promise resolving to an array of unique points.
	 */
	getPoints() {
		if (this.pointsCache) {
			return Promise.resolve(this.pointsCache);
		}
		if (this.routesCache) {
			this.pointsCache = UniquePointsFinder.findUniquePoints(this.routesCache);
			return Promise.resolve(this.pointsCache);
		}
		return this.dataProvider.getPoints().then((data) => {
			this.pointsCache = data;
			return data;
		});
	}
}

module.exports = { DataProvider, CacheDataProvider };
