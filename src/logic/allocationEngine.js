const CATEGORY_TO_SERVICE = {
	plumbing: 'plumber',
	electrical: 'electrician',
	cleaning: 'cleaner',
	carpentry: 'carpenter',
	gardening: 'gardener',
};

export function serviceTypeFor(categoryId) {
	const key = String(categoryId || '').trim().toLowerCase();
	return CATEGORY_TO_SERVICE[key] || key;
}

function numberValue(worker, keys, fallback = 0) {
	for (const key of keys) {
		const value = Number(worker?.[key]);
		if (Number.isFinite(value)) return value;
	}
	return fallback;
}

function isAvailable(worker) {
	const value = worker?.available ?? worker?.isAvailable ?? worker?.active;
	return value === undefined || value === true || value === 1 || value === '1' || value === 'available';
}

function distanceScore(worker, request = {}) {
	const distance = numberValue(worker, ['distanceKm', 'distance'], NaN);
	if (Number.isFinite(distance)) return Math.max(0, 1 - distance / 25);
	if (request.lat === undefined || request.lng === undefined) return 0.5;
	const workerLat = numberValue(worker, ['lat', 'latitude'], NaN);
	const workerLng = numberValue(worker, ['lng', 'longitude', 'lon'], NaN);
	if (!Number.isFinite(workerLat) || !Number.isFinite(workerLng)) return 0.5;
	const latDelta = (workerLat - request.lat) * 111;
	const lngDelta = (workerLng - request.lng) * 111 * Math.cos((request.lat * Math.PI) / 180);
	return Math.max(0, 1 - Math.sqrt(latDelta ** 2 + lngDelta ** 2) / 25);
}

export function rankWorkers(workers, categoryId, request = {}) {
	if (!Array.isArray(workers) || !categoryId) return [];
	const target = serviceTypeFor(categoryId);

	return workers
		.filter((worker) => String(worker?.service_type || worker?.serviceType || '').toLowerCase() === target)
		.map((worker) => {
			const ratingScore = Math.min(1, Math.max(0, numberValue(worker, ['rating_avg', 'ratingAvg', 'rating']) / 5));
			const availabilityScore = isAvailable(worker) ? 1 : 0;
			const workload = numberValue(worker, ['jobsAssignedCount', 'jobs_assigned_count', 'activeJobs', 'jobsToday']);
			const workloadScore = Math.max(0, 1 - workload / 10);
			const score =
				ratingScore * 0.25 +
				availabilityScore * 0.25 +
				distanceScore(worker, request) * 0.2 +
				workloadScore * 0.15 +
				1 * 0.15;

			return {
				worker,
				fairAllocationScore: Number(score.toFixed(4)),
				factors: {
					rating: ratingScore,
					availability: availabilityScore,
					distance: distanceScore(worker, request),
					workload: workloadScore,
					skillMatch: 1,
				},
			};
		})
		.sort((left, right) => right.fairAllocationScore - left.fairAllocationScore);
}

export default rankWorkers;
