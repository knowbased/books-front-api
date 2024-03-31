import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteBooks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteBooks"],
    mutationFn: async (id: number) => {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE",
        headers: {},
      });

      if (!response.ok) {
        throw new Error(`Failed to delete book with ID ${id}`);
      }

      return Promise.resolve(response.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
    },
  });
};
