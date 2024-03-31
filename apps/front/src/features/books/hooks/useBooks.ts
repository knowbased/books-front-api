import { useQuery } from "@tanstack/react-query";
import { Book } from "../dto/book";

export const useBooks = () => {
  const booksQuery = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/books", {
        headers: {},
      });
      const data = await response.json();
      return data as Book[];
    },
    enabled: true,
  });

  return booksQuery;
};
