import React from "react";
import ErrorBoundary from "@/page/error/errorBoundary";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <main className="w-screen h-screen flex flex-col">
        <RouterProvider router={routes} />
      </main>
    </ErrorBoundary>
  );
};

export default App;
