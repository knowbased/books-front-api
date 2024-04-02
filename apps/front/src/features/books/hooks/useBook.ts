import { useQuery } from "@tanstack/react-query";
import { Book } from "../dto/book";

export const useBook = (bookId: number) => {
  return useQuery({
    queryKey: ["books", bookId],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/books/${bookId}`,
      );
      const data = await response.json();
      return data as Book;
    },
  });
};
