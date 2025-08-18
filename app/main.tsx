import * as React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";

async function prepareApp() {
	if (import.meta.env.DEV) {
		const { worker } = await import("./msw/browser");
		await worker.start({ onUnhandledRequest: "warn" });
	}

	const root = document.getElementById("root")!;
	ReactDOM.createRoot(root).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
}

prepareApp();
