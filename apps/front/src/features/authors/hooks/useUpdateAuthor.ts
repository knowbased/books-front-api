import { useMutation, useQueryClient } from "@tanstack/react-query";

export type UpdateAuthorPayload = {
  authorsId: number;
  fullName: string;
};

export const useUpdateAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updateAuthorPayload: UpdateAuthorPayload) => {
      const response = await fetch(
        `http://localhost:3000/authors/${updateAuthorPayload.authorsId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: updateAuthorPayload.fullName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to update author with ID ${updateAuthorPayload.authorsId}`
        );
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
