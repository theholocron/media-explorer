export type TMovie = {
	type: "movie";
	id: string;
	title: string;
	director: string;
	yearReleased: number;
};

export interface MovieProps {
	item: TMovie;
	onClick: (id: string) => void;
}

export function Movie(props: MovieProps) {
	const { item, onClick } = props;
	const { director, id, type, title, yearReleased } = item;

	return (
		<div className="ticket" role="listitem" aria-label={`${type}-${id}`} onClick={() => onClick(id)}>
			<div className="top">
				<div className="bandname">{title}</div>
				<div className="tourname">{director}</div>
				<div className="year">{yearReleased}</div>
				<img src="https://img.freepik.com/premium-vector/movie-theater-signboard-blue_34230-295.jpg" alt="" />
			</div>

			<div className="rip" />

			<div className="bottom">
				<div className="barcode" />
			</div>
		</div>
	);
}
