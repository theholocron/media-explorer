import { Loading } from "../../lib/components/";
import { Book, Movie } from "../media/";
import { Empty } from "./empty";
import { type MediaItem, type FilterType } from "../use-media";

interface MediaTypeProps {
	type: FilterType;
	item: MediaItem;
	onClick: (id: string) => void;
}

function MediaType({ type, item, onClick }: MediaTypeProps) {
	if (type === "book") {
		return <Book item={item} role="listitem" onClick={onClick} />;
	}

	return <Movie item={item} role="listitem" onClick={onClick} />;
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
				<MediaType key={`${item.id}-${item}`} item={item} type={item.type} onClick={onClick} />
			))}
		</div>
	);
}
