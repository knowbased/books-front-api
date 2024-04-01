import { useQuery } from "@tanstack/react-query";
import { Author } from "../dto/author";

export const useAllAuthors = () => {
  return useQuery({
    queryKey: ["authors"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/authors", {
        headers: {},
      });
      const data = await response.json();
      return data as Author[];
    },
  });
};
