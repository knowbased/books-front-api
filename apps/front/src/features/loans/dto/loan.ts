export type Loan = {
  id: number;
  book: {
    id: number;
    title: string;
    author?: string;
  };
  userName: string;
  dueDate: string;
  returnDate?: string;
};
