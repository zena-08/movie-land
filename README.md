# Movieland 🎬

A modern movie discovery application built with React and TypeScript. Browse movies, watch trailers, and create your personal watchlist.

## Features ✨

- Search movies from TMDB's extensive database
- Watch movie trailers
- Star your favorite movies
- Create a "Watch Later" list
- Responsive design for mobile and desktop
- Search within your starred and watch later lists

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
   git clone <your-repository-url>
   cd coding-assignment
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
npm start
npm test
npm run build
npm run lint
npm run lint:src
npm run lint:ts
npm run lint:fix
npm run lint:src:fix
npm run lint:ts:fix
```

### Yarn
```sh
yarn start
yarn test
yarn build
yarn lint
yarn lint:src
yarn lint:ts
yarn lint:fix
yarn lint:src:fix
yarn lint:ts:fix
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

## Acknowledgments 🙏

- [TMDB](https://www.themoviedb.org/) for providing the movie data API
- [Create React App](https://github.com/facebook/create-react-app) for the initial project setup