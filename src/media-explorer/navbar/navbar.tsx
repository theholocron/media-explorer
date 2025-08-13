export type NavBarProps = {
	search: string;
	filterType?: "all" | "book" | "movie";
	sortBy: "title" | "year";
	sortOrder: "asc" | "desc";
	onSearchChange: (value: string) => void;
	onFilterChange: (value?: string) => void;
	onSortChange: (value: "title" | "year") => void;
	onSortOrderChange: (value: "asc" | "desc") => void;
};

export function NavBar(props: NavBarProps) {
	const { search, filterType, sortBy, sortOrder, onSearchChange, onFilterChange, onSortChange, onSortOrderChange } =
		props;

	return (
		<nav>
			<div>
				<h1 className="title-page">Media Explorer</h1>
			</div>

			<div style={{ flex: 1 }}>
				<input
					onChange={(e) => onSearchChange(e.target.value)}
					placeholder="Search title or author/director"
					type="search"
					value={search}
				/>
			</div>

			<div>
				<select
					aria-label="filter by type"
					onChange={(e) => onFilterChange(e.target.value || "all")}
					value={filterType || "all"}
				>
					<option value="all">All Types</option>
					<option value="book">Books</option>
					<option value="movie">Movies</option>
				</select>

				<select
					aria-label="sort by"
					value={sortBy}
					onChange={(e) => onSortChange(e.target.value as "title" | "year")}
				>
					<option value="title">Sort by Title</option>
					<option value="year">Sort by Year</option>
				</select>

				<button
					type="button"
					aria-label="sort order"
					onClick={() => onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}
					title={sortOrder === "asc" ? "Ascending" : "Descending"}
				>
					{sortOrder === "asc" ? "↑" : "↓"}
				</button>
			</div>
		</nav>
	);
}
