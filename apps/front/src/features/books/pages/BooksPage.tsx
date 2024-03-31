import { Center, HStack } from "styled-system/jsx";
import * as Table from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { useAllBooks } from "../hooks/useAllBooks";
import { useDeleteBooks } from "../hooks/useDeleteBooks";
import { useNavigate } from "react-router-dom";

export default function BooksPage() {
  const navigate = useNavigate();
  const { data, isLoading, isError, isSuccess } = useAllBooks();
  const deleteBooksMutation = useDeleteBooks();

  if (isLoading) return <Center>Loading...</Center>;

  if (isError || !isSuccess) throw new Error("Failed to load books");

  return (
    <>
      <HStack width="80%" justify="space-between" padding="2">
        <Center>BOOKS</Center>
        <Button onClick={() => navigate("/books/create")}>Create</Button>
      </HStack>

      <Table.Root maxWidth="4xl">
        <Table.Caption>Books Table</Table.Caption>
        <Table.Head>
          <Table.Row>
            <Table.Header>ID</Table.Header>
            <Table.Header>Title</Table.Header>
            <Table.Header>Author</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data.map((book, index) => (
            <Table.Row key={index}>
              <Table.Cell fontWeight="medium">{book.id}</Table.Cell>
              <Table.Cell>{book.title}</Table.Cell>
              <Table.Cell>{book.author?.fullName}</Table.Cell>
              <Table.Cell textAlign="center">
                <Button onClick={() => navigate(`/books/update/${book.id}`)}>
                  Update
                </Button>
              </Table.Cell>
              <Table.Cell textAlign="center">
                <Button onClick={() => deleteBooksMutation.mutate(book.id)}>
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}
