import { Center, HStack } from "styled-system/jsx";
import * as Table from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";

export default function BooksPage() {
  const booksData = [
    {
      id: 1,
      title: "The Lean Startup",
      author: "Eric Ries",
    },
  ];

  return (
    <>
      <HStack width="80%" justify="space-between" padding="2">
        <Center>BOOKS</Center>
        <Button>Create</Button>
      </HStack>

      <Table.Root maxWidth="4xl">
        <Table.Caption>Product Inventory</Table.Caption>
        <Table.Head>
          <Table.Row>
            <Table.Header>ID</Table.Header>
            <Table.Header>Title</Table.Header>
            <Table.Header>Author</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {booksData.map((book, index) => (
            <Table.Row key={index}>
              <Table.Cell fontWeight="medium">{book.id}</Table.Cell>
              <Table.Cell>{book.title}</Table.Cell>
              <Table.Cell>{book.author}</Table.Cell>
              <Table.Cell textAlign="center">
                <Button>Update</Button>
              </Table.Cell>
              <Table.Cell textAlign="center">
                <Button>Delete</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}
