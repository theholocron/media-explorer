import { type TBook, type TMovie } from "../media";

// Simple UUID v4 generator (RFC4122 compliant)
function generateUUID() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

// Shuffle helper (Fisher–Yates)
function shuffleArray<T>(array: T[]): T[] {
	const arr = [...array];
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

function createMedia<T extends { id?: string }>(item: Omit<T, "id">): T & { id: string } {
	// Using a type assertion here because TS cannot infer perfectly:
	return { ...item, id: generateUUID() } as T & { id: string };
}

export const mockBooks = [
	createMedia<TBook>({ type: "book", title: "Dune", author: "Frank Herbert", yearPublished: 1965 }),
	createMedia<TBook>({ type: "book", title: "The Hobbit", author: "J.R.R. Tolkien", yearPublished: 1937 }),
	createMedia<TBook>({ type: "book", title: "1984", author: "George Orwell", yearPublished: 1949 }),
	createMedia<TBook>({ type: "book", title: "To Kill a Mockingbird", author: "Harper Lee", yearPublished: 1960 }),
	createMedia<TBook>({ type: "book", title: "Brave New World", author: "Aldous Huxley", yearPublished: 1932 }),
	createMedia<TBook>({ type: "book", title: "The Catcher in the Rye", author: "J.D. Salinger", yearPublished: 1951 }),
	createMedia<TBook>({ type: "book", title: "Fahrenheit 451", author: "Ray Bradbury", yearPublished: 1953 }),
	createMedia<TBook>({ type: "book", title: "Moby Dick", author: "Herman Melville", yearPublished: 1851 }),
	createMedia<TBook>({ type: "book", title: "War and Peace", author: "Leo Tolstoy", yearPublished: 1869 }),
	createMedia<TBook>({
		type: "book",
		title: "Crime and Punishment",
		author: "Fyodor Dostoevsky",
		yearPublished: 1866,
	}),
	createMedia<TBook>({ type: "book", title: "The Great Gatsby", author: "F. Scott Fitzgerald", yearPublished: 1925 }),
	createMedia<TBook>({ type: "book", title: "The Lord of the Rings", author: "J.R.R. Tolkien", yearPublished: 1954 }),
	createMedia<TBook>({
		type: "book",
		title: "Harry Potter and the Sorcerer's Stone",
		author: "J.K. Rowling",
		yearPublished: 1997,
	}),
	createMedia<TBook>({ type: "book", title: "The Chronicles of Narnia", author: "C.S. Lewis", yearPublished: 1950 }),
	createMedia<TBook>({ type: "book", title: "Animal Farm", author: "George Orwell", yearPublished: 1945 }),
	createMedia<TBook>({ type: "book", title: "The Odyssey", author: "Homer", yearPublished: -800 }),
	createMedia<TBook>({ type: "book", title: "Frankenstein", author: "Mary Shelley", yearPublished: 1818 }),
	createMedia<TBook>({ type: "book", title: "The Grapes of Wrath", author: "John Steinbeck", yearPublished: 1939 }),
	createMedia<TBook>({ type: "book", title: "Les Misérables", author: "Victor Hugo", yearPublished: 1862 }),
	createMedia<TBook>({ type: "book", title: "Jane Eyre", author: "Charlotte Brontë", yearPublished: 1847 }),
];

export const mockMovies = [
	createMedia<TMovie>({ type: "movie", title: "Inception", director: "Christopher Nolan", yearReleased: 2010 }),
	createMedia<TMovie>({
		type: "movie",
		title: "The Matrix",
		director: "Lana Wachowski, Lilly Wachowski",
		yearReleased: 1999,
	}),
	createMedia<TMovie>({
		type: "movie",
		title: "The Godfather",
		director: "Francis Ford Coppola",
		yearReleased: 1972,
	}),
	createMedia<TMovie>({ type: "movie", title: "Pulp Fiction", director: "Quentin Tarantino", yearReleased: 1994 }),
	createMedia<TMovie>({
		type: "movie",
		title: "The Shawshank Redemption",
		director: "Frank Darabont",
		yearReleased: 1994,
	}),
	createMedia<TMovie>({ type: "movie", title: "The Dark Knight", director: "Christopher Nolan", yearReleased: 2008 }),
	createMedia<TMovie>({ type: "movie", title: "Fight Club", director: "David Fincher", yearReleased: 1999 }),
	createMedia<TMovie>({ type: "movie", title: "Forrest Gump", director: "Robert Zemeckis", yearReleased: 1994 }),
	createMedia<TMovie>({
		type: "movie",
		title: "The Lord of the Rings: The Return of the King",
		director: "Peter Jackson",
		yearReleased: 2003,
	}),
	createMedia<TMovie>({
		type: "movie",
		title: "Star Wars: Episode IV - A New Hope",
		director: "George Lucas",
		yearReleased: 1977,
	}),
	createMedia<TMovie>({ type: "movie", title: "Jurassic Park", director: "Steven Spielberg", yearReleased: 1993 }),
	createMedia<TMovie>({ type: "movie", title: "Titanic", director: "James Cameron", yearReleased: 1997 }),
	createMedia<TMovie>({ type: "movie", title: "Gladiator", director: "Ridley Scott", yearReleased: 2000 }),
	createMedia<TMovie>({
		type: "movie",
		title: "The Silence of the Lambs",
		director: "Jonathan Demme",
		yearReleased: 1991,
	}),
	createMedia<TMovie>({
		type: "movie",
		title: "Saving Private Ryan",
		director: "Steven Spielberg",
		yearReleased: 1998,
	}),
	createMedia<TMovie>({ type: "movie", title: "Avatar", director: "James Cameron", yearReleased: 2009 }),
	createMedia<TMovie>({ type: "movie", title: "Interstellar", director: "Christopher Nolan", yearReleased: 2014 }),
	createMedia<TMovie>({
		type: "movie",
		title: "The Lion King",
		director: "Roger Allers, Rob Minkoff",
		yearReleased: 1994,
	}),
	createMedia<TMovie>({
		type: "movie",
		title: "Back to the Future",
		director: "Robert Zemeckis",
		yearReleased: 1985,
	}),
	createMedia<TMovie>({ type: "movie", title: "The Avengers", director: "Joss Whedon", yearReleased: 2012 }),
];

export const mockMedia = shuffleArray([...mockBooks, ...mockMovies]);
