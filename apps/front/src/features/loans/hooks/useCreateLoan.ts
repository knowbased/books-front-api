import { useMutation, useQueryClient } from "@tanstack/react-query";

type CreateLoanPayload = {
  userName: string;
  bookId: number;
  dueDate: string;
};

export const useCreateLoan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (createLoanPayload: CreateLoanPayload) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/loans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createLoanPayload),
      });

      if (!response.ok) {
        throw new Error(`Failed to create loans`);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["loans"],
      });
    },
  });
};
