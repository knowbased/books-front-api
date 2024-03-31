export type Book = {
  id: number;
  title: string;
  author: {
    id: number;
    fullName: string;
  };
};
