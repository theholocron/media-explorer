import { Loading } from "../../lib/components/";
import { Book, Movie } from "../media/";
import { Empty } from "./empty";
import { type MediaItem } from "../use-media";

interface MediaTypeProps {
	item: MediaItem;
	onClick: (id: string) => void;
}

function MediaType(props: MediaTypeProps) {
	const { item, onClick } = props;

	if (item.type === "book") {
		return <Book item={item} onClick={() => onClick(item.id)} />;
	}

	return <Movie item={item} onClick={() => onClick(item.id)} />;
}

export interface MediaListProps {
	loading?: boolean;
	items: MediaItem[];
	onClick: (id: string) => void;
}

export function MediaList(props: MediaListProps) {
	const { loading = false, items, onClick } = props;

	if (loading) {
		return <Loading />;
	}

	if (!items || items.length === 0) {
		return <Empty />;
	}

	return (
		<div className="list-items" data-testid="media-list" role="list" aria-label="media-list">
			{items.map((item) => (
				<MediaType key={item.id} item={item} onClick={onClick} />
			))}
		</div>
	);
}
