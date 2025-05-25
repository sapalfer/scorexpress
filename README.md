# ScoreXpress - Medical Score Calculator

ScoreXpress is a web application designed to help medical professionals quickly and accurately calculate various medical scores. It provides a user-friendly interface for inputting criteria and instantly receiving score results and interpretations.

## Features

- **Wide Range of Scores:** Access a growing library of validated medical scores.
- **Instant Calculation:** Get immediate score results as you input data.
- **Clear Interpretations:** Understand the implications of each score with straightforward explanations.
- **Search & Filter:** Easily find the score you need using search and category filters.
- **Pagination:** Efficiently browse through the list of available scores.
- **Responsive Design:** Use the application seamlessly on desktop, tablet, or mobile devices.
- **User-Friendly Interface:** Clean and intuitive design for ease of use in a clinical setting.
- **About Page:** Learn more about the application's purpose and benefits.
- **Contact Page:** Provide feedback or get in touch with the development team.

## Tech Stack

- **Frontend:** React, TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Linting/Formatting:** ESLint (configured for TypeScript and React)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended, e.g., v18.x or v20.x)
- npm (comes with Node.js)

### Setup

1.  **Clone the repository (if applicable):**
    ```bash
    # git clone <repository-url>
    # cd project-directory
    ```

2.  **Install dependencies:**
    Navigate to the project directory in your terminal and run:
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start the Vite development server, typically at `http://localhost:5173` (or the next available port). The application will automatically reload if you make changes to the source files.

## Available Scripts

In the project directory, you can run the following scripts:

-   `npm run dev`
    Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to view it in the browser.

-   `npm run build`
    Builds the app for production to the `dist` folder.
    It correctly bundles React in production mode and optimizes the build for the best performance.

-   `npm run lint`
    Lints the project files using ESLint to catch errors and enforce code style.

-   `npm run typecheck`
    Runs the TypeScript compiler to check for type errors without emitting JavaScript files.

-   `npm run preview`
    Serves the production build locally from the `dist` folder. This is useful for testing the production build before deploying.

-   `npm run test`
    Launches the test runner (Vitest) in interactive watch mode.

-   `npm run test:ui`
    Launches the Vitest UI for a more visual way to run and inspect tests.

## Future Enhancements (Roadmap)

-   Functional backend for the Contact Form.
-   User authentication and personalized score lists/history.
-   Expansion of the medical score library.
-   Offline capabilities (PWA features).

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.
(Further details can be added here if the project becomes open source or has specific contribution guidelines).

## License

(Specify license type here, e.g., MIT, Apache 2.0, or proprietary if applicable).
This project is currently unlicensed (or specify your license).
