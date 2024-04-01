import { Book } from "~/features/books/dto/book";

export type Author = {
  id: number;
  fullName: string;
  books: Book[];
};
