import { Center, HStack } from "styled-system/jsx";
import * as Table from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useAllAuthors } from "../hooks/useAllAuthors";
import { useDeleteAuthor } from "../hooks/useDeleteAuthor";
import { isTextIncludedInData } from "../../../utils/isTextIncludeInData";
import { Author } from "../dto/author";

export default function AuthorsPage() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const { isLoading, isError, isSuccess, data } = useAllAuthors();
  const deleteAuthorMutation = useDeleteAuthor();

  if (isLoading) return <div>Loading...</div>;

  if (isError || !isSuccess) throw new Error("Cannot fetch authors data");

  const filteredData = data.filter((author) => {
    const { fullName } = author;
    return isTextIncludedInData<Author>(searchText, {
      fullName,
    });
  });

  return (
    <>
      <HStack width="80%" justify="space-between" padding="2">
        <Center>AUTHORS</Center>
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
          <Button onClick={() => navigate("/authors/create")}>Create</Button>
        </HStack>
      </HStack>

      <Table.Root maxWidth="4xl">
        <Table.Caption>Authors Table</Table.Caption>
        <Table.Head>
          <Table.Row>
            <Table.Header>ID</Table.Header>
            <Table.Header>Full name</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {filteredData.map((author, index) => (
            <Table.Row
              key={index}
              onClick={() => navigate(`/authors/${author.id}`)}
            >
              <Table.Cell fontWeight="medium">{author.id}</Table.Cell>
              <Table.Cell>{author.fullName}</Table.Cell>
              <Table.Cell textAlign="center">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/authors/${author.id}/update`);
                  }}
                >
                  Update
                </Button>
              </Table.Cell>
              <Table.Cell textAlign="center">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteAuthorMutation.mutate(author.id);
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
