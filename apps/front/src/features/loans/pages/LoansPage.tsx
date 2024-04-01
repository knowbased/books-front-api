import { Center, HStack } from "styled-system/jsx";
import * as Table from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useAllLoans } from "../hooks/useAllLoans";
import { useReturnLoan } from "../hooks/useReturnLoan";

export default function LoansPage() {
  const navigate = useNavigate();
  const { data, isLoading, isError, isSuccess } = useAllLoans();
  const returnLoanMutation = useReturnLoan();
  const [searchText, setSearchText] = useState("");

  if (isLoading) return <Center>Loading...</Center>;

  if (isError || !isSuccess) throw new Error("Failed to load books");

  const filteredData = data.filter((loan) => {
    return Object.values({
      bookTitle: loan.book.title,
      username: loan.userName,
    })
      .join(" ")
      .toLowerCase()
      .includes(searchText.toLowerCase());
  });

  return (
    <>
      <HStack width="80%" justify="space-between" padding="2">
        <Center>LOANS</Center>
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
          <Button onClick={() => navigate("/loans/create")}>Create</Button>
        </HStack>
      </HStack>

      <Table.Root maxWidth="4xl">
        <Table.Caption>Loans Table</Table.Caption>
        <Table.Head>
          <Table.Row>
            <Table.Header>ID</Table.Header>
            <Table.Header>Book Title</Table.Header>
            <Table.Header>Username</Table.Header>
            <Table.Header>Due Date</Table.Header>
            <Table.Header>Status</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {filteredData.map((loan, index) => (
            <Table.Row
              key={index}
              //   onClick={() => navigate(`/books/${book.id}`)}
            >
              <Table.Cell fontWeight="medium">{loan.id}</Table.Cell>
              <Table.Cell>{loan.book.title}</Table.Cell>
              <Table.Cell>{loan.userName}</Table.Cell>
              <Table.Cell>
                {new Date(loan.dueDate).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>
                {loan.returnDate
                  ? `returned:  ${new Date(loan.returnDate).toLocaleDateString()}`
                  : "in progress"}
              </Table.Cell>
              {!loan.returnDate && (
                <Table.Cell textAlign="center">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      returnLoanMutation.mutate(loan.id);
                    }}
                  >
                    Return
                  </Button>
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}
