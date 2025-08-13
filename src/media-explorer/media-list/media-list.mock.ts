import { type Book, type Movie } from "../media";

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

export const mockBooks: Book[] = [
	{ type: "book", title: "Dune", author: "Frank Herbert", yearPublished: 1965 },
	{ type: "book", title: "The Hobbit", author: "J.R.R. Tolkien", yearPublished: 1937 },
	{ type: "book", title: "1984", author: "George Orwell", yearPublished: 1949 },
	{ type: "book", title: "To Kill a Mockingbird", author: "Harper Lee", yearPublished: 1960 },
	{ type: "book", title: "Brave New World", author: "Aldous Huxley", yearPublished: 1932 },
	{ type: "book", title: "The Catcher in the Rye", author: "J.D. Salinger", yearPublished: 1951 },
	{ type: "book", title: "Fahrenheit 451", author: "Ray Bradbury", yearPublished: 1953 },
	{ type: "book", title: "Moby Dick", author: "Herman Melville", yearPublished: 1851 },
	{ type: "book", title: "War and Peace", author: "Leo Tolstoy", yearPublished: 1869 },
	{ type: "book", title: "Crime and Punishment", author: "Fyodor Dostoevsky", yearPublished: 1866 },
	{ type: "book", title: "The Great Gatsby", author: "F. Scott Fitzgerald", yearPublished: 1925 },
	{ type: "book", title: "The Lord of the Rings", author: "J.R.R. Tolkien", yearPublished: 1954 },
	{ type: "book", title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", yearPublished: 1997 },
	{ type: "book", title: "The Chronicles of Narnia", author: "C.S. Lewis", yearPublished: 1950 },
	{ type: "book", title: "Animal Farm", author: "George Orwell", yearPublished: 1945 },
	{ type: "book", title: "The Odyssey", author: "Homer", yearPublished: -800 },
	{ type: "book", title: "Frankenstein", author: "Mary Shelley", yearPublished: 1818 },
	{ type: "book", title: "The Grapes of Wrath", author: "John Steinbeck", yearPublished: 1939 },
	{ type: "book", title: "Les Misérables", author: "Victor Hugo", yearPublished: 1862 },
	{ type: "book", title: "Jane Eyre", author: "Charlotte Brontë", yearPublished: 1847 },
].map((book) => ({ ...book, id: generateUUID() }));

export const mockMovies: Movie[] = [
	{ type: "movie", title: "Inception", director: "Christopher Nolan", yearReleased: 2010 },
	{ type: "movie", title: "The Matrix", director: "Lana Wachowski, Lilly Wachowski", yearReleased: 1999 },
	{ type: "movie", title: "The Godfather", director: "Francis Ford Coppola", yearReleased: 1972 },
	{ type: "movie", title: "Pulp Fiction", director: "Quentin Tarantino", yearReleased: 1994 },
	{ type: "movie", title: "The Shawshank Redemption", director: "Frank Darabont", yearReleased: 1994 },
	{ type: "movie", title: "The Dark Knight", director: "Christopher Nolan", yearReleased: 2008 },
	{ type: "movie", title: "Fight Club", director: "David Fincher", yearReleased: 1999 },
	{ type: "movie", title: "Forrest Gump", director: "Robert Zemeckis", yearReleased: 1994 },
	{
		type: "movie",
		title: "The Lord of the Rings: The Return of the King",
		director: "Peter Jackson",
		yearReleased: 2003,
	},
	{ type: "movie", title: "Star Wars: Episode IV - A New Hope", director: "George Lucas", yearReleased: 1977 },
	{ type: "movie", title: "Jurassic Park", director: "Steven Spielberg", yearReleased: 1993 },
	{ type: "movie", title: "Titanic", director: "James Cameron", yearReleased: 1997 },
	{ type: "movie", title: "Gladiator", director: "Ridley Scott", yearReleased: 2000 },
	{ type: "movie", title: "The Silence of the Lambs", director: "Jonathan Demme", yearReleased: 1991 },
	{ type: "movie", title: "Saving Private Ryan", director: "Steven Spielberg", yearReleased: 1998 },
	{ type: "movie", title: "Avatar", director: "James Cameron", yearReleased: 2009 },
	{ type: "movie", title: "Interstellar", director: "Christopher Nolan", yearReleased: 2014 },
	{ type: "movie", title: "The Lion King", director: "Roger Allers, Rob Minkoff", yearReleased: 1994 },
	{ type: "movie", title: "Back to the Future", director: "Robert Zemeckis", yearReleased: 1985 },
	{ type: "movie", title: "The Avengers", director: "Joss Whedon", yearReleased: 2012 },
].map((movie) => ({ ...movie, id: generateUUID() }));

export const mockMedia = shuffleArray([...mockBooks, ...mockMovies]);
