import { useQuery } from "@tanstack/react-query";
import { Loan } from "../dto/loan";

export const useAllLoans = () => {
  const booksQuery = useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/loans");
      const data = await response.json();
      return data as Loan[];
    },
  });

  return booksQuery;
};
