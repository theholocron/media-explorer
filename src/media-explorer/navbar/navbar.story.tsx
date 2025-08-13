import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";
import { NavBar } from "./navbar";

const meta = {
	component: NavBar,
	title: "NavBar",
} satisfies Meta<typeof NavBar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		search: "",
		filterType: "all" as "all" | "book" | "movie",
		sortBy: "title" as "title" | "year",
		sortOrder: "asc" as "asc" | "desc",
		onSearchChange: fn(),
		onFilterChange: fn(),
		onSortChange: fn(),
		onSortOrderChange: fn(),
	},
	play: async ({ canvas, userEvent }) => {
		// Get controls
		const searchInput = await canvas.findByPlaceholderText(/search title or author\/director/i);
		const filterSelect = await canvas.findByRole("combobox", { name: /filter by type/i });
		const sortSelect = await canvas.findByRole("combobox", { name: /sort by/i });
		const sortOrderButton = await canvas.findByRole("button", { name: /sort order/i });

		await userEvent.selectOptions(filterSelect, "movie");
		await userEvent.selectOptions(sortSelect, "title");

		await userEvent.click(sortOrderButton);
		await userEvent.clear(searchInput);
		await userEvent.type(searchInput, "Harry Potter");
	},
} satisfies Story;
