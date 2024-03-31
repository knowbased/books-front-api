import { useMutation, useQueryClient } from "@tanstack/react-query";

export type UpdateBookPayload = {
  bookId: number;
} & Partial<{
  title: string;
  authorId?: number;
}>;

export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updateBookPayload: UpdateBookPayload) => {
      const response = await fetch(
        `http://localhost:3000/books/${updateBookPayload.bookId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: updateBookPayload.title,
            authorId: updateBookPayload.authorId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to update book with ID ${updateBookPayload.bookId}`
        );
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
