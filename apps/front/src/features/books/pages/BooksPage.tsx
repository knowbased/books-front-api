import { Center, HStack } from "styled-system/jsx";
import * as Table from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { useAllBooks } from "../hooks/useAllBooks";
import { useDeleteBooks } from "../hooks/useDeleteBooks";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { isTextIncludedInData } from "../../../utils/isTextIncludeInData";

export default function BooksPage() {
  const navigate = useNavigate();
  const { data, isLoading, isError, isSuccess } = useAllBooks();
  const deleteBooksMutation = useDeleteBooks();
  const [searchText, setSearchText] = useState("");

  if (isLoading) return <Center>Loading...</Center>;

  if (isError || !isSuccess) throw new Error("Failed to load books");

  const filteredData = data.filter((book) => {
    const { title, author } = book;
    return isTextIncludedInData(searchText, {
      title,
      fullName: author?.fullName,
    });
  });

  return (
    <>
      <HStack width="80%" justify="space-between" padding="2">
        <Center>BOOKS</Center>
        <HStack gap="5">
          <HStack gap="1">
            <Input
              name="search"
              type="text"
              placeholder="Search"
              onChange={(e) => setSearchText(e.currentTarget.value)}
            />
            <Search />
          </HStack>
          <Button onClick={() => navigate("/books/create")}>Create</Button>
        </HStack>
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
          {filteredData.map((book, index) => (
            <Table.Row
              key={index}
              onClick={() => navigate(`/books/${book.id}`)}
            >
              <Table.Cell fontWeight="medium">{book.id}</Table.Cell>
              <Table.Cell>{book.title}</Table.Cell>
              <Table.Cell>{book.author?.fullName}</Table.Cell>
              <Table.Cell textAlign="center">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/books/${book.id}/update`);
                  }}
                >
                  Update
                </Button>
              </Table.Cell>
              <Table.Cell textAlign="center">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteBooksMutation.mutate(book.id);
                  }}
                >
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
