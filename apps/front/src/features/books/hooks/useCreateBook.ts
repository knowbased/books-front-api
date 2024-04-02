import { useMutation, useQueryClient } from "@tanstack/react-query";

type CreateBookPayload = {
  title: string;
  authorId?: number;
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (createBookPayload: CreateBookPayload) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createBookPayload),
      });

      if (!response.ok) {
        throw new Error(`Failed to create book`);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
    },
  });
};
