import { mockMedia } from "./media-list/media-list.mock";

describe("Media Explorer Page", () => {
	const mediaList = '[aria-label="media-list"] > div';
	const loadMoreBtn = "button.load-more";
	const filterSelect = 'select[aria-label="filter by type"]';
	const sortBySelect = 'select[aria-label="sort by"]';
	const sortOrderBtn = 'button[aria-label="sort order"]';
	const searchInput = 'input[placeholder="Search title or author/director"]';
	const modalOverlay = '.modal-overlay[role="dialog"]';
	const modalCloseBtn = ".modal-content .close-btn";

	beforeEach(() => {
		// Intercept /media request and mock response
		cy.intercept("GET", "**/media", {
			statusCode: 201,
			body: { items: mockMedia },
		}).as("getMedia");

		// Visit the page fresh each time
		cy.visit("/");
	});

	it("user can filter, sort, search, and view media details", () => {
		// Assert initial list has 10 items
		cy.get(mediaList).should("have.length", 10);

		// Click "Load More" and wait for new data
		cy.get(loadMoreBtn).click();
		cy.get(mediaList).should("have.length", 20);

		// Select movie filter and wait for filtered data
		cy.get(filterSelect).select("movie");
		cy.get(`${mediaList}.ticket`).should("have.length", 10);

		// Select sort by title and wait for sorted data
		cy.get(sortBySelect).select("title");
		cy.get(`${mediaList}.ticket`).first().should("contain.text", "Avatar");

		// Toggle sort order and wait for reordered data
		cy.get(sortOrderBtn).click();
		cy.get(`${mediaList}.ticket`).first().should("not.contain.text", "Avatar");

		// Type "Homer" into search and wait for filtered data
		cy.get(searchInput).clear();
		cy.get(searchInput).type("Homer");
		cy.get(mediaList).should("have.length", 1);

		// Load more button should be disabled (only one item)
		cy.get(loadMoreBtn).should("be.disabled");

		// Click the single item to open modal
		cy.get('[aria-label^="book-"]').click();

		// Check modal content inside modal overlay
		cy.get(modalOverlay).within(() => {
			cy.get(".book")
				.should("have.attr", "aria-label")
				.and("match", /^book-/);
			cy.get(".title").should("contain.text", "The Odyssey");
			cy.get(".creator").should("contain.text", "Homer");

			// Close modal
			cy.get(modalCloseBtn).click();
		});

		// Confirm modal is closed
		cy.get(modalOverlay).should("not.exist");

		// Clear the search input and reset state
		cy.get(searchInput).clear();
		cy.get(mediaList).should("have.length", 10);

		// Assert no books displayed after clearing search
		cy.get('[aria-label="media-list"] > .book').should("have.length", 0);

		// Toggle sort order and check first movie title is Avatar
		cy.get(sortOrderBtn).click();
		cy.get(`${mediaList}.ticket`).first().should("contain.text", "Avatar");

		// Select sort by year and check first movie is The Godfather
		cy.get(sortBySelect).select("year");
		cy.get(`${mediaList}.ticket`).first().should("contain.text", "The Godfather");

		// Select filter 'all' and check first item is The Odyssey (a book)
		cy.get(filterSelect).select("all");
		cy.get(mediaList).first().should("contain.text", "The Odyssey");
	});
});
