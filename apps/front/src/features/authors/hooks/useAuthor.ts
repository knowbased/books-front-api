import { useQuery } from "@tanstack/react-query";
import { Author } from "../dto/author";

export const useAuthor = (authorId: number) => {
  return useQuery({
    queryKey: ["authors", authorId],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/authors/${authorId}`,
      );
      const data = await response.json();
      return data as Author;
    },
  });
};
