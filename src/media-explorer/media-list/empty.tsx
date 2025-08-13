export function Empty() {
	return (
		<div className="empty-card" data-testid="empty">
			<p className="title">No media found</p>
			<p className="subtitle">Try adjusting your search or filters</p>
		</div>
	);
}
