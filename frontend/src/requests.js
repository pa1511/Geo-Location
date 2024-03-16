import { backendURL } from "./config";

export async function findPointsInViewport({lng1, lat1, lng2, lat2}) {
    const urlSearchParams = new URLSearchParams({lng1, lat1, lng2, lat2});
	const response = await fetch(`${backendURL}findPointsInViewport/?${urlSearchParams}`);

	if (response.status === 200) {
		const {data} = await response.json();
		return data;
	}

    throw new Error("There was a problem with the fetch operation");
}

export async function findNearestRoutes({lng, lat}) {
    const urlSearchParams = new URLSearchParams({lng, lat, count: 1});
	const response = await fetch(`${backendURL}findNearestRoutes/?${urlSearchParams}`);

	if (response.status === 200) {
		const {data} = await response.json();
		return data.length>0 ? data[0] : undefined;
	}

    throw new Error("There was a problem with the fetch operation");
}
