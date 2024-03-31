import { Center, Stack } from "styled-system/jsx";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { FormLabel } from "../../../components/ui/form-label";
import * as Card from "../../../components/ui/card";
import { vstack } from "styled-system/patterns";
import { useCreateBook } from "../hooks/useCreateBook";
import { useNavigate } from "react-router-dom";

export default function CreateBookPage() {
  const createBookMutation = useCreateBook();
  const navigate = useNavigate();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const title = formData.get("title") as string;
    const authorId = formData.get("authorId") as string;

    createBookMutation.mutate({
      title: title,
      authorId: authorId ? parseInt(authorId) : undefined,
    });

    navigate("/books");
  };

  return (
    <>
      <Center>
        <Card.Root width="sm" marginTop="5">
          <Card.Header paddingBottom="4">
            <Card.Title>Book</Card.Title>
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
                  placeholder="Book Title"
                  required
                />
              </Stack>
              <Stack gap="1.5" width="full">
                <FormLabel htmlFor="AuthorId">Author ID</FormLabel>
                <Input
                  id="AuthorId"
                  name="authorId"
                  type="number"
                  placeholder="Author ID"
                />
              </Stack>
              <Button type="submit" alignSelf="flex-end">
                Create
              </Button>
            </form>
          </Card.Body>
        </Card.Root>
      </Center>
    </>
  );
}
