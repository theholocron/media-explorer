import type { Metadata } from "next";
import * as React from "react";
import MSW from "./msw";

import "./normalize.css";
import "./app.css";

export const metadata: Metadata = {
	title: "Media Explorer – Browse Books & Movies",
	description:
		"Media Explorer is a simple web app for discovering and exploring books and movies. Search, filter, sort, and view details for your favorite media.",
	openGraph: {
		title: "Media Explorer – Browse Books & Movies",
		description:
			"Discover a mixed list of books and movies with Media Explorer. Search, filter, sort, and explore detailed information on each item.",
		images: ["https://next-rsc-notes.vercel.app/og.png"],
	},
	robots: {
		index: true,
		follow: true,
	},
};

export type WithChildren = Readonly<{
	children: React.ReactNode;
}>;

export default function RootLayout(props: WithChildren) {
	return (
		<html lang="en">
			<body>
				<MSW.Provider>{props.children}</MSW.Provider>
			</body>
		</html>
	);
}
