# Movieland 🎬

A modern movie discovery application built with React and TypeScript. Browse movies, watch trailers, and create your personal watchlist.

## 📋 Code Review

[Code Review Summary](./CODE_REVIEW.md).


## Features ✨

- **Search & Discover**: Find movies from TMDB's extensive database with debounced search for smooth performance.
- **Watch Trailers**: Stream movie trailers directly within the app.
- **Personal Lists**: Star your favorite movies and create a "Watch Later" list for future viewing.
- **Responsive Design**: Enjoy a seamless experience on both mobile and desktop devices.
- **Infinite Scroll**: Browse movies effortlessly with infinite scrolling for a smooth user experience.

## Tech Stack 🛠️

- **Frontend**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **Styling**: SCSS with CSS Modules
- **API**: TMDB (The Movie Database)
- **Testing**: Jest + React Testing Library

## Getting Started 🚀

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/zenajose/movieland.git
   cd movieland
   ```

2. Install dependencies:
   - Using npm:
     ```bash
     npm install
     ```
   - Or using Yarn:
     ```bash
     yarn install
     ```

3. Start the development server:
   - Using npm:
     ```bash
     npm start
     ```
   - Or using Yarn:
     ```bash
     yarn start
     ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Available Scripts 📝

### npm
```sh
npm start          # Start development server
npm test           # Run all tests
npm test <path>    # Run tests for a specific file (e.g., npm test src/components/TrailerModal)
npm run test:update # Update snapshots for all tests
npm test <path> -u # Update snapshots for a specific file
npm run build      # Build for production
```

### Yarn
```sh
yarn start         # Start development server
yarn test          # Run all tests
yarn test <path>   # Run tests for a specific file (e.g., yarn test src/components/TrailerModal)
yarn test:update   # Update snapshots for all tests
yarn test <path> -u # Update snapshots for a specific file
yarn build         # Build for production
```

## Code Quality

### npm
```sh
npm run lint       # Lint all files
npm run lint:src   # Lint src directory
npm run lint:ts    # Lint TypeScript files
npm run lint:fix   # Lint and fix issues
```

### Yarn
```sh
yarn lint          # Lint all files
yarn lint:src      # Lint src directory
yarn lint:ts       # Lint TypeScript files
yarn lint:fix      # Lint and fix issues
```

## Project Structure 📁

```
src/
├── components/    # Reusable UI components with SCSS styles and tests
├── context/       # React context providers
├── store/         # Redux slices and store
├── hooks/         # Custom React hooks
├── pages/         # Page components with SCSS styles and tests
├── styles/        # Global SCSS styles
├── types/         # TypeScript type definitions
└── utils/         # Utility functions and constants
```

## Future Improvements

- [ ] Add a theme toggle so users can switch between light and dark mode.
- [ ] Move all text to constants to make the app easier to update and support multiple languages.
- [ ] Switch from CRA to Vite to fix security issues and make the app faster and easier to maintain.
- [ ] Improve color contrast to make the app more accessible (see: 🔗 [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)).
- [ ] Remove duplicate styles and icons by putting shared ones in a single file.
- [ ] Add integration tests and E2E tests with Playwright to catch bugs and test user flows.

## Acknowledgments 🙏

- [TMDB](https://www.themoviedb.org/) for providing the movie data API
- [Create React App](https://github.com/facebook/create-react-app) for the initial project setup