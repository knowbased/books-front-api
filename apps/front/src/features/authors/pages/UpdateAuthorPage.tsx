import { Center, Stack } from "styled-system/jsx";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { FormLabel } from "../../../components/ui/form-label";
import * as Card from "../../../components/ui/card";
import { vstack } from "styled-system/patterns";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthor } from "../hooks/useAuthor";
import { UpdateAuthorPayload, useUpdateAuthor } from "../hooks/useUpdateAuthor";

export default function UpdateAuthorPage() {
  const { id } = useParams();
  const { isLoading, isSuccess, isError, data } = useAuthor(Number(id));
  const updateAuthorMutation = useUpdateAuthor();
  const navigate = useNavigate();

  if (isLoading) return <Center>Loading...</Center>;

  if (isError || !isSuccess) throw new Error("Failed to load book");

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const fullName = formData.get("fullname") as string;

    const payload: UpdateAuthorPayload = {
      authorsId: Number(id),
      fullName: fullName,
    };

    updateAuthorMutation.mutate(payload);

    navigate("/authors");
  };

  return (
    <>
      <Center>
        <Card.Root width="sm" marginTop="5">
          <Card.Header paddingBottom="4">
            <Card.Title>Update Author n°{Number(id)}</Card.Title>
          </Card.Header>
          <Card.Body>
            <form
              onSubmit={handleFormSubmit}
              className={vstack({ gap: "4", alignItems: "center" })}
            >
              <Stack gap="1.5" width="full">
                <FormLabel htmlFor="fullname">Title</FormLabel>
                <Input
                  id="fullname"
                  name="fullname"
                  type="text"
                  placeholder={data.fullName}
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
