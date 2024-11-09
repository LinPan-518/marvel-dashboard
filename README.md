# Marvel Character Dashboard

This project is a Marvel Character Dashboard built with React and TypeScript. It allows users to search for Marvel characters, view character details, and sort characters by name. The application is styled using Tailwind CSS and leverages SWR for efficient data fetching.

Demo: [Marvel Dashboard](https://marvel-dashboard-omega.vercel.app/) deployed and supported by [Vercel](https://vercel.com/).

## Tools for usage

- [React](https://react.dev/) for front-end implementation.
- [Marvel API](https://developer.marvel.com/) for providing the character data.
- [Vite](https://vitejs.dev/) for the build tool.
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework.
- [SWR](https://swr.vercel.app/) for data fetching.
- [Typescript](https://www.typescriptlang.org/) for the strongly typed programming.

## Features

- **Search Characters/Comics**: Enter a character name in the search bar to filter characters.
- **View Character/Comic Details**: Click on a character/comic name in the table to view more details.
- **Sorting**: Characters can be sorted by name in ascending or descending order.
- **Reusable Table Component**: The table component is designed to be reusable for displaying character and comic list.
- **Responsive Design**: Styled with Tailwind CSS for a responsive and modern UI.
- **Error Handling and Loading States**: Apply error boundary for proper error handling and loading states for API requests.
- **Infinite Scrolling**: Utilizes `useSWR`, `useSWRInfinite` for efficient data fetching and infinite scrolling to fetch characters as many as possible.

## Getting Started

### Prerequisites

- Node.js

### Installation

1. Clone the repository:

   ```sh
   https://github.com/LinPan-518/marvel-dashboard.git
   cd marvel-dashboard
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. In the `.env` file in the root directory and add your Marvel API credentials:

   ```.env
   VITE_API_URL="https://gateway.marvel.com/v1/public"
   VITE_PUBLIC_API_KEY="your_public_api_key"
   ```

### Running the Application

1. Start the development server:

   ```sh
   npm run dev
   ```

2. Open your browser and navigate to http://localhost:5173.

### Building for Production

1. Build the application:

   ```sh
   npm run build
   ```

2. Preview the application:

   ```sh
   npm run preview
   ```

### Project Structure

- **src/component**: Contains the reusable components.
- **src/page**: Pages for displaying the list of Marvel characters/comics and details.
- **src/hook**: Custom hooks for fetching data using SWR.
- **src/services**: API client and environment variables configuration.
