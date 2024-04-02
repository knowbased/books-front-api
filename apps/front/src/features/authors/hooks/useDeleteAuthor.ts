import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteAuthor"],
    mutationFn: async (id: number) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/authors/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to delete authors with ID ${id}`);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["authors"],
      });
    },
  });
};
