import { Center, Stack } from "styled-system/jsx";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { FormLabel } from "../../../components/ui/form-label";
import * as Card from "../../../components/ui/card";
import { vstack } from "styled-system/patterns";
import { useNavigate, useParams } from "react-router-dom";
import { useBook } from "../hooks/useBook";
import { UpdateBookPayload, useUpdateBook } from "../hooks/useUpdateBook";

export default function UpdateBookPage() {
  const { id } = useParams();
  const { isLoading, isSuccess, isError, data } = useBook(Number(id));
  const updateBookMutation = useUpdateBook();
  const navigate = useNavigate();

  if (isLoading) return <Center>Loading...</Center>;

  if (isError || !isSuccess) throw new Error("Failed to load book");

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const title = formData.get("title") as string;
    const authorId = formData.get("authorId") as string;

    const payload: UpdateBookPayload = {
      bookId: Number(id),
    };
    if (title) payload.title = title;
    if (authorId) payload.authorId = Number(authorId);

    updateBookMutation.mutate(payload);

    navigate("/books");
  };

  return (
    <>
      <Center>
        <Card.Root width="sm" marginTop="5">
          <Card.Header paddingBottom="4">
            <Card.Title>Update Book n°{Number(id)}</Card.Title>
          </Card.Header>
          <Card.Body>
            <form
              onSubmit={handleFormSubmit}
              className={vstack({ gap: "4", alignItems: "center" })}
            >
              <Stack gap="1.5" width="full">
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder={data.title}
                />
              </Stack>
              <Stack gap="1.5" width="full">
                <FormLabel htmlFor="AuthorId">Author ID</FormLabel>
                <Input
                  id="AuthorId"
                  name="authorId"
                  type="number"
                  placeholder={String(data.author?.id)}
                />
              </Stack>
              <Button type="submit" alignSelf="flex-end">
                Update
              </Button>
            </form>
          </Card.Body>
        </Card.Root>
      </Center>
    </>
  );
}
