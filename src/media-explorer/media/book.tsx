export type TBook = {
	type: "book";
	id: string;
	title: string;
	author: string;
	yearPublished: number;
};

export interface BookProps {
	item: TBook;
	onClick: (id: string) => void;
}

function colorFromId(id: string) {
	let hash = 0;
	for (let i = 0; i < id.length; i++) {
		hash = id.charCodeAt(i) + ((hash << 5) - hash);
	}

	// Hue = 0–359
	const hue = Math.abs(hash) % 360;
	const saturation = 30; // fixed for muted look
	const lightness = 70; // fixed for muted look

	return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export function Book(props: BookProps) {
	const { item, onClick } = props;
	const { author, id, type, title, yearPublished } = item;

	return (
		<div
			className="book"
			role="listitem"
			aria-label={`${type}-${id}`}
			onClick={() => onClick(id)}
			style={{ backgroundColor: colorFromId(id) }}
		>
			<h1 className="title">{title}</h1>
			<h2 className="creator">{author}</h2>
			<h3 className="year">{yearPublished}</h3>
		</div>
	);
}
