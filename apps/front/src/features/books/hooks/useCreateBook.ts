import { useMutation, useQueryClient } from "@tanstack/react-query";

type CreateBookPayload = {
  title: string;
  authorId?: number;
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (createBookPayload: CreateBookPayload) => {
      const response = await fetch(`http://localhost:3000/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Spécifiez le type de contenu JSON
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
