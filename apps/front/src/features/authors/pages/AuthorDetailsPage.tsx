import { Center, VStack } from "styled-system/jsx";
import * as Card from "../../../components/ui/card";
import { useParams } from "react-router-dom";
import { useAuthor } from "../hooks/useAuthor";

export default function AuthorDetailsPage() {
  const { id } = useParams();
  const { isLoading, isSuccess, isError, data } = useAuthor(Number(id));

  if (isLoading) return <Center>Loading...</Center>;

  if (isError || !isSuccess) throw new Error("Failed to load book");

  return (
    <>
      <Center>
        <Card.Root width="sm" marginTop="5">
          <Card.Header paddingBottom="4">
            <Card.Title>Author n°{Number(id)}</Card.Title>
          </Card.Header>
          <Card.Body>
            <VStack alignItems="flex-start">
              <p>
                {" "}
                <strong>id : </strong> {data.id}
              </p>
              <p>
                <strong>Full name : </strong> {data.fullName}
              </p>
              <p>
                <strong>Books : </strong>
              </p>
              <ul>
                {data.books.map((book) => (
                  <li key={book.id}>{book.title}</li>
                ))}
              </ul>
            </VStack>
          </Card.Body>
        </Card.Root>
      </Center>
    </>
  );
}
