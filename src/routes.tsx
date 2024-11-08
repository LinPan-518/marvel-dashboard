import { createBrowserRouter, Outlet } from "react-router-dom";

import HomePage from "@/page/dashboard";
import HeroPage from "@/page/hero";
import { Error404, Error401NoAcc, Error403AccessDenied, Error409 } from "@/page/error";
import Header from "@/component/navBar";
import Footer from "@/component/footer";

function Layout() {
  return (
    <>
      <Header />
      <div className="w-full flex-1">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/character/:id",
        element: <HeroPage />,
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
