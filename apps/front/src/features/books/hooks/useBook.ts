import { useQuery } from "@tanstack/react-query";
import { Book } from "../dto/book";

export const useBook = (bookId: number) => {
  return useQuery({
    queryKey: ["books", bookId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/books/${bookId}`);
      const data = await response.json();
      return data as Book;
    },
  });
};
