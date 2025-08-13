import type { Meta, StoryObj } from "@storybook/nextjs";
import { expect, screen, waitFor } from "storybook/test";
import { mediaListHandler, mediaListErrorHandler } from "./handlers";
import * as NavBarStories from "./navbar/navbar.story";
import { MediaExplorer } from "./media-explorer";

const meta = {
	component: MediaExplorer,
	title: "MediaExplorer",
} satisfies Meta<typeof MediaExplorer>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	parameters: {
		msw: {
			handlers: [mediaListHandler],
		},
	},
	play: async ({ canvas, context, step, userEvent }) => {
		await waitFor(
			async () => {
				const renderedItems = await canvas.findAllByRole("listitem");
				expect(renderedItems.length).toBe(10);
			},
			{ timeout: 3000 }
		);

		await step("Load more items", async () => {
			const loadMoreBtn = await canvas.findByRole("button", { name: /load more/i });
			await userEvent.click(loadMoreBtn);
			await waitFor(
				async () => {
					const expandedItems = await canvas.findAllByRole("listitem");
					expect(expandedItems.length).toBe(20);
				},
				{ timeout: 3000 }
			);
		});

		await step("Search and filter", async () => {
			// eslint-disable-next-line storybook/context-in-play-function
			await NavBarStories.Default.play(context);
		});

		await step("Click the first item", async () => {
			await waitFor(
				async () => {
					const filteredItems = await canvas.findAllByRole("listitem");
					expect(filteredItems.length).toBe(1);
				},
				{ timeout: 3000 }
			);

			const filteredItems = await canvas.findAllByRole("listitem");
			await userEvent.click(filteredItems[0]);

			const modal = await screen.findByRole("dialog");
			expect(modal).toBeInTheDocument();

			await userEvent.click(modal);
			expect(modal).not.toBeInTheDocument();
		});

		await step("Reset to default state", async () => {
			const searchInput = await canvas.findByPlaceholderText("Search title or author/director");
			await userEvent.clear(searchInput);

			await waitFor(
				async () => {
					const resetItems = await canvas.findAllByRole("listitem");
					expect(resetItems.length).toBe(10);
				},
				{ timeout: 3000 }
			);

			await waitFor(
				async () => {
					const filterSelect = await canvas.findByRole("combobox", { name: /filter by type/i });
					const sortSelect = await canvas.findByRole("combobox", { name: /sort by/i });
					const sortOrderButton = await canvas.findByRole("button", { name: /sort order/i });
					await userEvent.click(sortOrderButton);
					await userEvent.selectOptions(sortSelect, "year");
					await userEvent.selectOptions(filterSelect, "all");
				},
				{ timeout: 3000 }
			);

			await waitFor(
				async () => {
					const homer = await canvas.findAllByRole("listitem");
					expect(homer[0]).toHaveTextContent(/Homer/i);
				},
				{ timeout: 3000 }
			);
		});
	},
} satisfies Story;

export const Error = {
	args: {
		error: "Something",
	},
	parameters: {
		msw: {
			handlers: [mediaListErrorHandler],
		},
	},
} satisfies Story;
