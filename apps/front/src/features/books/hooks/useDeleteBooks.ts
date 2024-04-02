import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteBooks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteBooks"],
    mutationFn: async (id: number) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/books/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to delete book with ID ${id}`);
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
