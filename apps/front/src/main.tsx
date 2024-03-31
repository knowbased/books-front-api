import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import { MainLayout } from "./components/layouts/MainLayout";
import BooksPage from "./features/books/pages/BooksPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorDisplay } from "./features/misc/ErrorDisplay";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CreateBookPage from "./features/books/pages/CreateBookPage";
import UpdateBookPage from "./features/books/pages/UpdateBookPage";
import BookDetailsPage from "./features/books/pages/BookDetailsPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorDisplay />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/books",
        element: <BooksPage />,
      },
      {
        path: "/books/create",
        element: <CreateBookPage />,
      },
      {
        path: "/books/update/:id",
        element: <UpdateBookPage />,
      },
      {
        path: "/books/:id",
        element: <BookDetailsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
