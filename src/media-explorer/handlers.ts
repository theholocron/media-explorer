import { /* delay, */ http, HttpResponse } from "msw";
import { Default as MediaListDefault } from "./media-list/media-list.story";

export const mediaListErrorHandler = http.get("/media", () => HttpResponse.json([]));

export const mediaListHandler = http.get("/media", async ({ request }) => {
	const url = new URL(request.url);
	const search = url.searchParams.get("search")?.toLowerCase() || "";
	const type = url.searchParams.get("type");
	const sortBy = url.searchParams.get("sortBy") || "year";
	const sortOrder = url.searchParams.get("sortOrder") || "asc";
	const page = Number(url.searchParams.get("page") || "1");
	const limit = Number(url.searchParams.get("limit") || "10");

	const orderMultiplier = sortOrder === "asc" ? 1 : -1;

	// Filter by type
	let filtered = [...MediaListDefault.args.items];

	if (search) {
		filtered = filtered.filter((item) => {
			const searchableText = [
				item.title.toLowerCase(),
				"author" in item ? item.author.toLowerCase() : "",
				"director" in item ? item.director.toLowerCase() : "",
			].join(" ");

			return searchableText.includes(search);
		});
	}

	if (type) {
		filtered = filtered.filter((item) => item.type === type);
	}

	// Sort by sortBy param
	filtered.sort((a, b) => {
		if (sortBy === "title") {
			return a.title.localeCompare(b.title) * orderMultiplier;
		} else if (sortBy === "year") {
			const yearA = "yearPublished" in a ? a.yearPublished : a.yearReleased;
			const yearB = "yearPublished" in b ? b.yearPublished : b.yearReleased;
			return (yearA - yearB) * orderMultiplier;
		}

		return 0;
	});

	// Pagination
	const startIndex = (page - 1) * limit;
	const paginated = filtered.slice(startIndex, startIndex + limit);

	// uncomment if you want to simulate longer delay in API loading states
	// await delay(1000);

	return HttpResponse.json({
		items: paginated,
		total: filtered.length,
	});
});

export const handlers = [mediaListHandler];
