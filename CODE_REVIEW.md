# Code Review Notes


## Security Issues:

- There's no input sanitization on search queries before hitting the API. This could lead to injection vulnerabilities. We should sanitize inputs before use.
- Move API key to .env instead of hardcoding it in constants.js (You can still see the key in the request url. Using a backend service to make api calls will solve this).
- robot.txt Disallow mentions nothing. We need to add a '/' to block all search engine crawlers from indexing any part of the website


## Installation Issues:

- Installation gives errors as node-sass is deprecated. Use latest sass instead.
  run `npm uninstall node-sass` to install node-sass
  run `npm install sass` to install sass


## Architecture & Code Structure:

- Some components are selecting the entire Redux state instead of specific slices (e.g. `App, Movie, Starred, WatchLater`). It can cause unnecessary re-renders and also affects the readability. Would be better to use selectors to pull only what is needed.
- The state doesn't have TypeScript types, which makes it harder to understand and easier to make mistakes.
- Consider migrating the codebase to TypeScript to improve type safety, developer experience, and maintainability.
- There's no error boundary. This means if one part of the app crashes, the whole app might go down. We should add an `<ErrorBoundary>` wrapper.


## Component Level Issues:

- There is a lot of prop drilling across components, which can make the code harder to manage and scale. Consider using React Context or a state management library like Redux to simplify data flow and improve code structure.
- There's a `closeCard` function that's currently empty. It looks like a placeholder but does nothing right now.
- Prop validation is missing. We should either use PropTypes or define proper TypeScript interfaces to make it clear what props are expected.
- Some components (e.g. `App.js`) are doing too much. Would be nice to split it into  into smaller, focused components and move logic out to hooks or child components whereever possible. Ideally, App.js should act as a layout or router wrapper, keeping it clean and minimal.
- Inline styles are being used in some components, which can make the code harder to maintain and scale. It's better to use CSS Modules, SCSS, or styled-components to keep styling organized and reusable.


## API Handling Issues:

- There's no error handling for API requests. This could result in bad user experience if something breaks.
- There's also no loading state for async calls, so users might think the app is frozen which again leads to bad UX.
- I see there are direct fetch calls within the components. Try not to fetch data directly in components. Instead, move the fetch logic to a separate file or to the store, and then use the data in the component. This makes the code easier to manage and test.
- Handle fetch errors using try/catch or .catch() to prevent silent failures.


## Performance Issues:

- Found some direct DOM manipulations (e.g. in myClickHandler). Use React state instead.
- Deprecated `e.cancelBubble` is being used. We could use `e.stopPropagation()` instead.
- No memoization for expensive calculations. using `useMemo` or `React.memo` would help improve performance.
- The movie list is not virtualized, which may lead to performance issues when rendering large datasets. To improve performance and reduce DOM load, consider implementing lazy loading with the Intersection Observer API for infinite scrolling.
- Search is not debounced and making too many api calls 


## State Management:

- Duplicate movie data is stored in multiple Redux slices, which can lead to inconsistencies and unnecessary complexity. Consider normalizing the Redux state to store shared data in a single source.


## Accessibility:

- Image `alt` attributes are too generic - better to describe the content meaningfully. (Add link to EU rule)
- Some interactive elements are missing ARIA labels.
- The UI might have color contrast issues (needs checking).
- Keyboard navigation isn't fully supported in all views.


## Code Quality:

- There are a few unused imports and variables throughout the code.
- Code formatting is a bit inconsistent in places - a Prettier + ESLint setup would help a lot.


## Testing:

- No unit tests for components.
- Didn't see any integration tests or E2E tests.


## ✅ Summary: What to Prioritize
If I had to pick the most urgent fixes, I'd recommend:

### Security
- Sanitize user input

### Architecture
- Add TypeScript
- Create a centralized API service
- Add error boundaries

### Performance & UX
- Memoize where needed
- Add proper loading and error states

### Testing
- Start with unit tests for key components
- Add integration and E2E tests where possible


