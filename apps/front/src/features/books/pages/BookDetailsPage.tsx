import { Center, VStack } from "styled-system/jsx";
import * as Card from "../../../components/ui/card";
import { useParams } from "react-router-dom";
import { useBook } from "../hooks/useBook";

export default function BookDetailsPage() {
  const { id } = useParams();
  const { isLoading, isSuccess, isError, data } = useBook(Number(id));

  if (isLoading) return <Center>Loading...</Center>;

  if (isError || !isSuccess) throw new Error("Failed to load book");

  return (
    <>
      <Center>
        <Card.Root width="sm" marginTop="5">
          <Card.Header paddingBottom="4">
            <Card.Title>Book n°{Number(id)}</Card.Title>
          </Card.Header>
          <Card.Body>
            <VStack alignItems="flex-start">
              <p>
                {" "}
                <strong>id : </strong> {data.id}
              </p>
              <p>
                <strong>Title : </strong> {data.title}
              </p>
              <p>
                <strong>Author : </strong> {data.author?.fullName}
              </p>
            </VStack>
          </Card.Body>
        </Card.Root>
      </Center>
    </>
  );
}
