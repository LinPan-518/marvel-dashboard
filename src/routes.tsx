import { createBrowserRouter, Outlet } from "react-router-dom";

import CharactersPage from "@/page/characterList";
import CharacterPage from "@/page/characterDetail";
import { Error404, Error401NoAcc, Error403AccessDenied, Error409 } from "@/page/error";
import Header from "@/component/navBar";
import Footer from "@/component/footer";
import ScrollToTop from "@/component/scrollToTop";
import ComicsPage from "@/page/comicList";
import ComicPage from "@/page/comicDetail";

function Layout() {
  return (
    <main className="w-screen h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <div className="w-full flex-1">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}

export const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <CharactersPage />,
      },
      {
        path: "/character/:id",
        element: <CharacterPage />,
      },
      {
        path: "/comics",
        element: <ComicsPage />,
      },
      {
        path: "/comics/:id",
        element: <ComicPage />,
      },
      {
        path: "/error_401_no_accounts",
        element: <Error401NoAcc />,
      },
      {
        path: "/error_403",
        element: <Error403AccessDenied />,
      },
      {
        path: "/error_409",
        element: <Error409 />,
      },
      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
]);
