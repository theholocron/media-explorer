import type { Meta, StoryObj } from "@storybook/nextjs";
import { expect, fn } from "storybook/test";
import { mockMedia } from "./media-list.mock";
import { MediaList } from "./media-list";
import BookStories from "../media/book.story";
import MovieStories from "../media/movie.story";

const meta = {
	component: MediaList,
	title: "MediaList",
	argTypes: {
		...BookStories.argTypes,
		...MovieStories.argTypes,
	},
} satisfies Meta<typeof MediaList>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		items: mockMedia,
		loading: false,
		onClick: fn(),
	},
	render: (args) => {
		return <MediaList {...args} items={args.items.slice(0, 10)} />;
	},
	play: async ({ args, canvas, userEvent }) => {
		const renderedItems = canvas.getAllByRole("listitem");
		expect(renderedItems.length).toBe(10);

		// Check at least one book and one movie are present
		const books = renderedItems.filter((el) => el.classList.contains("book"));
		const movies = renderedItems.filter((el) => el.classList.contains("ticket"));
		expect(books.length).toBeGreaterThan(0);
		expect(movies.length).toBeGreaterThan(0);

		await userEvent.click(renderedItems[0]);

		expect(args.onClick).toHaveBeenCalledTimes(1);
		expect(args.onClick).toHaveBeenCalledWith(args.items[0].id);
	},
} satisfies Story;

export const Loading = {
	args: {
		...Default.args,
		items: [],
		loading: true,
	},
} satisfies Story;

export const Empty = {
	args: {
		...Loading.args,
		loading: false,
	},
} satisfies Story;
