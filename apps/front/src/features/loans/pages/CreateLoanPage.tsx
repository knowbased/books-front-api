import { Center, Stack } from "styled-system/jsx";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { FormLabel } from "../../../components/ui/form-label";
import * as Card from "../../../components/ui/card";
import { vstack } from "styled-system/patterns";
import { useNavigate } from "react-router-dom";
import { useCreateLoan } from "../hooks/useCreateLoan";

export default function CreateLoanPage() {
  const createLoanMutation = useCreateLoan();
  const navigate = useNavigate();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const username = formData.get("username") as string;
    const bookId = formData.get("bookId") as string;
    const dueDate = formData.get("dueDate") as string;

    createLoanMutation.mutate({
      bookId: Number(bookId),
      userName: username,
      dueDate: dueDate,
    });

    navigate("/loans");
  };

  return (
    <>
      <Center>
        <Card.Root width="sm" marginTop="5">
          <Card.Header paddingBottom="4">
            <Card.Title>Loan</Card.Title>
          </Card.Header>
          <Card.Body>
            <form
              onSubmit={handleFormSubmit}
              className={vstack({ gap: "4", alignItems: "center" })}
            >
              <Stack gap="1.5" width="full">
                <FormLabel htmlFor="bookId">Book ID</FormLabel>
                <Input
                  id="bookId"
                  name="bookId"
                  type="number"
                  placeholder="Book ID"
                  required
                />
              </Stack>
              <Stack gap="1.5" width="full">
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  required
                />
              </Stack>
              <Stack gap="1.5" width="full">
                <FormLabel htmlFor="dueDate">Due Date</FormLabel>
                <Input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  placeholder="Due Date"
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
