import { defineConfig } from "cypress";

/*
 * @see https://docs.cypress.io/app/references/configuration
 */
export default defineConfig({
	component: {
		devServer: {
			framework: "next",
			bundler: "vite",
		},
	},
	e2e: {
		baseUrl: "http://localhost:3000/", // this is the default port for `next` that runs a server
		specPattern: "src/**/*.{cy.js,cy.ts}",
		supportFile: false,
		retries: 2,
	},
	projectId: "u9gw53",
});
