import { useQuery } from "@tanstack/react-query";
import { Book } from "../dto/book";

export const useAllBooks = () => {
  const booksQuery = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/books`, {
        headers: {},
      });
      const data = await response.json();
      return data as Book[];
    },
  });

  return booksQuery;
};
