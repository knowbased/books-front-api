import { Link, Outlet } from "react-router-dom";
import { HStack, VStack } from "styled-system/jsx";
import { Button } from "../ui/button";
import { hstack } from "styled-system/patterns";

export const MainLayout = () => {
  return (
    <VStack minHeight="100vh">
      <HStack
        width="full"
        justify="space-between"
        padding="3"
        borderColor="bg.muted"
        borderBottomWidth="medium"
      >
        <div>Books</div>
        <ul className={hstack()}>
          <li>
            <Link to="/">
              <Button>Home</Button>
            </Link>
          </li>
          <li>
            <Link to="books">
              <Button>Books</Button>
            </Link>
          </li>
          <li>
            <Link to="authors">
              <Button>Authors</Button>
            </Link>
          </li>
          <li>
            <Link to="loans">
              <Button>Loans</Button>
            </Link>
          </li>
        </ul>
      </HStack>
      <Outlet />
    </VStack>
  );
};
