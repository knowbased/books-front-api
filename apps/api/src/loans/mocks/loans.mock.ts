import { Loan } from '../entities/loan.entity';

export const loansMock: Loan[] = [
  {
    id: 1,
    book: {
      id: 1,
      title: 'Book Title',
      author: undefined,
    },
    userName: 'User Name',
    dueDate: new Date(),
    returnDate: undefined,
  },
];
