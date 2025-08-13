import * as React from "react";
import { ErrorSection, Modal } from "../lib/components/";
import { useDebounce } from "../lib/hooks/";

import { Book, type TBook, Movie, type TMovie } from "./media";
import { MediaList } from "./media-list/";
import { NavBar } from "./navbar/";
import { useMedia } from "./use-media";

export interface MediaExplorerProps {
	error?: string;
}

export function MediaExplorer(props: MediaExplorerProps) {
	const { error = "" } = props;
	const [state, dispatch] = useMedia();
	const [selectedItem, setSelectedItem] = React.useState<null | TBook | TMovie>(null);
	const [localSearch, setLocalSearch] = React.useState(state.search);
	const debouncedSearch = useDebounce(localSearch, 300);
	const { filterType, sortBy, sortOrder, page } = state;

	React.useEffect(() => {
		if (debouncedSearch !== state.search) {
			dispatch({ type: "SET_SEARCH", search: debouncedSearch });
		}
	}, [debouncedSearch, dispatch, state.search]);

	const handleItemClick = (id: string) => {
		const item = state.items.find((i) => i.id === id);
		if (item) {
			setSelectedItem(item);
		}
	};

	const handleCloseModal = () => {
		setSelectedItem(null);
	};

	if (error) {
		return <ErrorSection />;
	}

	return (
		<React.Fragment>
			<NavBar
				search={localSearch}
				filterType={filterType}
				sortBy={sortBy}
				sortOrder={sortOrder}
				onSearchChange={setLocalSearch}
				onFilterChange={(mediaType) =>
					dispatch({
						type: "SET_FILTER_TYPE",
						mediaType: mediaType === "all" ? undefined : (mediaType as "book" | "movie"),
					})
				}
				onSortChange={(sortBy) => dispatch({ type: "SET_SORT", sortBy })}
				onSortOrderChange={(sortOrder) => dispatch({ type: "SET_SORT_ORDER", sortOrder })}
			/>
			<MediaList items={state.items} loading={state.loading} onClick={handleItemClick} />
			{state?.items?.length > 0 && (
				<footer className="footer">
					<button
						className="load-more"
						disabled={state?.items?.length >= state.total || state.loading}
						onClick={() => dispatch({ type: "SET_PAGE", page: page + 1 })}
					>
						{state.loading ? "Loading..." : "Load More"}
					</button>
				</footer>
			)}
			{selectedItem && (
				<Modal onClose={handleCloseModal}>
					{selectedItem.type === "book" && <Book item={selectedItem} onClick={handleCloseModal} />}
					{selectedItem.type === "movie" && <Movie item={selectedItem} onClick={handleCloseModal} />}
				</Modal>
			)}
		</React.Fragment>
	);
}
