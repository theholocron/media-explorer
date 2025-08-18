import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Book, type BookProps } from "./book";
import { mockBooks } from "../media-list/media-list.mock";

const meta = {
	component: Book,
	title: "Media/Book",
	argTypes: {
		onClick: { action: "onClick" },
	},
} satisfies Meta<typeof Book>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
	render: (args: BookProps) => (
		<ul>
			<Book {...args} />
		</ul>
	),
	args: {
		item: mockBooks[0],
		onClick: fn(),
	},
	play: async ({ canvas, args, userEvent }) => {
		const ticket = canvas.getByRole("listitem", { name: `${args.item.type}-${args.item.id}` });
		await userEvent.click(ticket);

		expect(args.onClick).toHaveBeenCalledWith(args.item.id);
	},
} satisfies Story;

const longTitleString = `This task's name is absurdly large. In fact, I think if I keep going I might end up with content overflow. What will happen? The star that represents a pinned task could have text overlapping. The text could cut-off abruptly when it reaches the star. I hope not!`;

export const LongTitle = {
	render: (args: BookProps) => (
		<ul>
			<Book {...args} />
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
