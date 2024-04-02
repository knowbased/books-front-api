import { useQuery } from "@tanstack/react-query";
import { Author } from "../dto/author";

export const useAllAuthors = () => {
  return useQuery({
    queryKey: ["authors"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/authors`, {
        headers: {},
      });
      const data = await response.json();
      return data as Author[];
    },
  });
};
