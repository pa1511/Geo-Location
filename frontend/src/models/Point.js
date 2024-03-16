export const Point = {
	create: (point) => ({
		id: point.id,
		region: point.region[0].map((e) => e.reverse()),
	}),
};

export default Point;