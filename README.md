# Media Explorer

A media explorer to explore all media.

## Available Scripts

Below are the main scripts available for development, testing, and building the project:

Make sure you run `npm install` after cloning the project first.

| Command                       | Description                                                                                                                                    |
| :---------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| **`npm run dev`**             | Runs the development server with hot-reloading on <http://localhost:3000>.                                                                     |
| **`npm run start:storybook`** | Starts Storybook in development mode on <http://localhost:6006>, allowing you to view, interact and run tests with UI components in isolation. |
| **`npm run build`**           | Builds the application for production deployment.                                                                                              |
| **`npm run build:storybook`** | Builds the Storybook static site and outputs it to the `docs` folder. Useful for deploying your component library documentation.               |
| **`npm run lint`**            | Runs the Super-Linter Docker container to statically analyze your code for style and syntax issues.                                            |
| **`npm run test`**            | Runs unit and integration tests using Vitest.                                                                                                  |
| **`npm run test:storybook`**  | Runs Storybook-related tests with Vitest in a non-interactive mode.                                                                            |
| **`npm run test:cypress`**    | Opens the Cypress test runner GUI to execute end-to-end tests and debug them interactively.                                                    |
| **`npm run prepare`**         | Initializes Husky Git hooks to enable pre-commit and other Git lifecycle scripts.                                                              |
| **`npm run start`**           | Starts the storybook server after building the app.                                                                                            |

## Tech Stack

Tech Stack:

- Storybook - chosen for its visual testing framework
- Cypress - chosen for E2E testing
- Playwright - chosen for integration with Storybook, Cypress to run A11y tests
- Vite/Vitest - test runner chosen for speed and integration with other tools

## Directory Structure

Below is a deeper description of the directory structure and some of the choices that were made to ensure the highest possible quality of code.

```bash
.
├── .github/                 # GitHub Actions and CI setup
├── .husky/                  # Git hooks (pre-commit, commit-msg, etc.)
├── .storybook/              # Storybook setup for component, visual, and other tests
├── app/                     # Next.js app router setup; MSW integration; layout/page shells
│   └── page/                # Next.js page entry points; shells that point to components
├── src/                     # Main source code
│   ├── lib/                 # Common components and hooks (like a utility or component library)
│   └── media-explorer/      # Core feature component of the app
│       ├── media/           # Components for different media types (books, movies) with stories
│       ├── media-list/      # List component for rendering media items; handles loading/empty states
│       └── navbar/          # Navbar component with search, filter, and sort UI
```

### `.github/`

Contains **GitHub Actions** workflows and continuous integration (CI) configuration.

This ensures automated testing, linting, builds, and deployments happen consistently for every pull request and merge. Helps maintain high-quality code and prevent regressions before they reach production.

### `.husky/`

Holds **Husky** Git hooks configuration.

Used to run scripts before key Git actions (e.g., `pre-commit`, `pre-push`) such as lint checks, type checks, or changeset verification, ensuring issues are caught early in the developer workflow.

### `.storybook/`

Configuration for **Storybook** — the single source of truth for component development and testing.

Includes setup for:

- Component stories
- Visual regression tests
- Accessibility checks
- Interaction tests

This is designed as the **full testing suite** for UI components in isolation, making it easier to develop, review, and QA UI independently of the backend. Traditionally, testing is done with unit tests via some sort of testing framework like Jest or Vitest with co-located test files. These are designed to test components or functions in its purest form and not necessarily as robust as an app like this would require.

Following [Chromatic's Guide to Testing](https://www.chromatic.com/frontend-testing-guide#unit), the goal is to use Storybook and Chromatic along with its various tools to fully test the front end.

### `app/`

Next.js **App Router** setup.

Contains:

- Minimal **page** and **layout** definitions (serving as shell entry points)
- **Mock Service Worker (MSW)** setup for API mocking in development and tests

Pages in this folder are intentionally light, delegating business logic and UI to feature modules for better separation of concerns. The goal is to be able to create NextJS pages in isolation as modules to be imported in a larger more complex application.

### `src/`

The core of the application; **all reusable code and feature implementations** live here.

#### `lib/`

Contains **shared utilities, hooks, and components** that are generic enough to be extracted into a component library or common utilities package. This was intentionally kept light without tests as it would be imported code.

#### `media-explorer/`

The **primary feature module** of the app encapsulates everything needed for the "Media Explorer" page.

Includes:

- Feature-specific state management and hooks (business logic)
- MSW handlers for mocking relevant APIs
- Cypress end-to-end tests for this page
- Storybook stories for UI validation

Organized for **feature-first development**, ensuring related logic, UI, and tests live together.

##### `navbar/`

A **dumb component** for the application’s navigation bar.

Contains UI for search, filter, and sort, but delegates logic to the feature’s hooks. Follows the principle of keeping UI components **presentational and reusable**.

##### `media/`

Houses components specific to each **media type** (e.g., books, movies).

Contains related Storybook stories for testing in isolation. Purposefully kept simple following **AHA programming** (“Avoid Hasty Abstractions”). The idea being that these types of media could be extended to more types or allow for very unique designs.

##### `media-list/`

A **generic list renderer** for media items.

Handles:

- Loading states
- Empty states
- Rendering lists for any media type (books, movies, etc.)

Kept generic so it can be reused for different content types without major modification.
