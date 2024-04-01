import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import { MainLayout } from "./components/layouts/MainLayout";
import BooksPage from "./features/books/pages/BooksPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorDisplay } from "./features/misc/ErrorDisplay";
import CreateBookPage from "./features/books/pages/CreateBookPage";
import UpdateBookPage from "./features/books/pages/UpdateBookPage";
import BookDetailsPage from "./features/books/pages/BookDetailsPage";
import AuthorsPage from "./features/authors/pages/AuthorsPage";
import CreateAuthorPage from "./features/authors/pages/CreateAuthorPage";
import UpdateAuthorPage from "./features/authors/pages/UpdateAuthorPage";
import AuthorDetailsPage from "./features/authors/pages/AuthorDetailsPage";
import LoansPage from "./features/loans/pages/LoansPage";
import CreateLoanPage from "./features/loans/pages/CreateLoanPage";

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
        path: "/books/:id/update",
        element: <UpdateBookPage />,
      },
      {
        path: "/books/:id",
        element: <BookDetailsPage />,
      },
      {
        path: "/authors",
        element: <AuthorsPage />,
      },
      {
        path: "/authors/create",
        element: <CreateAuthorPage />,
      },
      {
        path: "/authors/:id/update",
        element: <UpdateAuthorPage />,
      },
      {
        path: "/authors/:id",
        element: <AuthorDetailsPage />,
      },
      {
        path: "/loans",
        element: <LoansPage />,
      },
      {
        path: "/loans/create",
        element: <CreateLoanPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
