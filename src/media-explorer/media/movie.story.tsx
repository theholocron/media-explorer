import type { Meta, StoryObj } from "@storybook/nextjs";
import { expect, fn } from "storybook/test";
import { Movie, type MovieProps } from "./movie";
import { mockMovies } from "../media-list/media-list.mock";

const meta = {
	component: Movie,
	title: "Media/Movie",
	argTypes: {
		onClick: { action: "onClick" },
	},
} satisfies Meta<typeof Movie>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
	render: (args: MovieProps) => (
		<ul>
			<Movie {...args} />
		</ul>
	),
	args: {
		item: mockMovies[0],
		onClick: fn(),
	},
	play: async ({ canvas, args, userEvent }) => {
		const movie = canvas.getByRole("listitem", { name: `${args.item.type}-${args.item.id}` });
		await userEvent.click(movie);

		expect(args.onClick).toHaveBeenCalledWith(args.item.id);
	},
} satisfies Story;

const longTitleString = `This task's name is absurdly large. In fact, I think if I keep going I might end up with content overflow. What will happen? The star that represents a pinned task could have text overlapping. The text could cut-off abruptly when it reaches the star. I hope not!`;

export const LongTitle = {
	render: (args: MovieProps) => (
		<ul>
			<Movie {...args} />
		</ul>
	),
	args: {
		...Default.args,
		item: {
			...Default.args.item,
			id: "4",
			title: longTitleString,
		},
	},
} satisfies Story;
