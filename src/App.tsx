import React from "react";
import ErrorBoundary from "@/page/error/errorBoundary";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { SWRConfig } from "swr";

const swrConfig = {
  revalidateOnFocus: false,
  revalidateFirstPage: false,
};
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <SWRConfig value={swrConfig}>
        <RouterProvider router={routes} />
      </SWRConfig>
    </ErrorBoundary>
  );
};

export default App;
