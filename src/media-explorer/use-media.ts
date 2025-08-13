import * as React from "react";
import { type Book, type Movie } from "./media/";

export type FilterType = "book" | "movie";
export type SortOrder = "asc" | "desc";
export type SortBy = "title" | "year";

export type MediaItem = Book | Movie;
export interface MediaResponse {
	items: MediaItem[];
	total: number;
}

export interface GetMediaItemsParams {
	search?: string;
	type?: FilterType;
	sortBy?: SortBy;
	sortOrder?: SortOrder;
	page?: number;
	limit?: number;
}

const getMediaItems = (params?: GetMediaItemsParams, options?: RequestInit): Promise<MediaResponse> => {
	const query = new URLSearchParams();
	if (params?.search) query.append("search", params.search);
	if (params?.type) query.append("type", params.type);
	if (params?.sortBy) query.append("sortBy", params.sortBy);
	if (params?.sortOrder) query.append("sortOrder", params.sortOrder);
	if (params?.page) query.append("page", String(params.page));
	if (params?.limit) query.append("limit", String(params.limit));

	// API mock fetch
	return fetch(`/media?${query.toString()}`, options).then((res) => res.json());
};

export type MediaAction =
	| { type: "SET_ITEMS"; items: MediaItem[] }
	| { type: "APPEND_ITEMS"; items: MediaItem[] }
	| { type: "SET_SEARCH"; search: string }
	| { type: "SET_FILTER_TYPE"; mediaType: "book" | "movie" | undefined }
	| { type: "SET_SORT"; sortBy: "title" | "year" }
	| { type: "SET_SORT_ORDER"; sortOrder: SortOrder }
	| { type: "SET_PAGE"; page: number }
	| { type: "SET_TOTAL"; total: number }
	| { type: "SET_LOADING"; loading: boolean };

export interface MediaState {
	filterType?: FilterType;
	items: MediaItem[];
	page: number;
	search: string;
	sortBy: SortBy;
	sortOrder: SortOrder;
	total: number;
	loading: boolean;
}

export function mediaReducer(state: MediaState, action: MediaAction): MediaState {
	switch (action.type) {
		case "SET_ITEMS":
			return { ...state, items: action.items };
		case "APPEND_ITEMS":
			return { ...state, items: [...state.items, ...action.items] };
		case "SET_SEARCH":
			return { ...state, search: action.search, page: 1, items: [] };
		case "SET_FILTER_TYPE":
			return { ...state, filterType: action.mediaType, page: 1, items: [] };
		case "SET_SORT":
			return { ...state, sortBy: action.sortBy, page: 1, items: [] };
		case "SET_SORT_ORDER":
			return { ...state, sortOrder: action.sortOrder, page: 1, items: [] };
		case "SET_PAGE":
			return { ...state, page: action.page };
		case "SET_TOTAL":
			return { ...state, total: action.total };
		case "SET_LOADING":
			return { ...state, loading: action.loading };
		default:
			return state;
	}
}

export function useMedia(): [MediaState, React.Dispatch<MediaAction>, () => void] {
	const [state, dispatch] = React.useReducer(mediaReducer, {
		items: [],
		search: "",
		filterType: undefined,
		sortBy: "year",
		sortOrder: "asc",
		page: 1,
		total: 0,
		loading: true,
	});

	const loadItems = React.useCallback(() => {
		dispatch({ type: "SET_LOADING", loading: true });

		getMediaItems({
			search: state.search,
			type: state.filterType,
			sortBy: state.sortBy,
			sortOrder: state.sortOrder,
			page: state.page,
			limit: 10,
		})
			.then(({ items, total }) => {
				const maxPage = Math.ceil(total / 10);

				if (state.page > maxPage && maxPage > 0) {
					if (state.page !== 1) {
						dispatch({ type: "SET_PAGE", page: 1 });
					}
				} else {
					if (state.page === 1) {
						dispatch({ type: "SET_ITEMS", items });
					} else {
						dispatch({ type: "APPEND_ITEMS", items });
					}
					dispatch({ type: "SET_TOTAL", total });
				}
			})
			.finally(() => {
				dispatch({ type: "SET_LOADING", loading: false });
			});
	}, [state.search, state.filterType, state.sortBy, state.sortOrder, state.page]);

	React.useEffect(() => {
		loadItems();
	}, [loadItems]);

	return [state, dispatch, loadItems];
}
