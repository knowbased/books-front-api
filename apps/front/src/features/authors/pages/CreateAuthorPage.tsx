import { Center, Stack } from "styled-system/jsx";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { FormLabel } from "../../../components/ui/form-label";
import * as Card from "../../../components/ui/card";
import { vstack } from "styled-system/patterns";
import { useNavigate } from "react-router-dom";
import { useCreateAuthor } from "../hooks/useCreateAuthor";

export default function CreateAuthorPage() {
  const createAuthorMutation = useCreateAuthor();
  const navigate = useNavigate();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const fullName = formData.get("fullname") as string;

    createAuthorMutation.mutate({
      fullName: fullName,
    });

    navigate("/authors");
  };

  return (
    <>
      <Center>
        <Card.Root width="sm" marginTop="5">
          <Card.Header paddingBottom="4">
            <Card.Title>Author</Card.Title>
          </Card.Header>
          <Card.Body>
            <form
              onSubmit={handleFormSubmit}
              className={vstack({ gap: "4", alignItems: "center" })}
            >
              <Stack gap="1.5" width="full">
                <FormLabel htmlFor="fullname">Full name</FormLabel>
                <Input
                  id="fullname"
                  name="fullname"
                  type="text"
                  placeholder="Author Full name"
                  required
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
