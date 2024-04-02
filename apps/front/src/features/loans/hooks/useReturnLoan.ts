import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useReturnLoan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["returnLoan"],
    mutationFn: async (id: number) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/loans/${id}/return`,
        {
          method: "PATCH",
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to returned loan with ID ${id}`);
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
