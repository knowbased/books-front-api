import { useMutation, useQueryClient } from "@tanstack/react-query";

type CreateAuthorPayload = {
  fullName: string;
};

export const useCreateAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (createAuthorPayload: CreateAuthorPayload) => {
      const response = await fetch(`http://localhost:3000/authors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createAuthorPayload),
      });

      if (!response.ok) {
        throw new Error(`Failed to create author`);
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
