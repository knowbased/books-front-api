import { loansMock } from './loans.mock';

export const LoanServiceMock = {
  create: jest.fn().mockResolvedValue({ message: 'Loan created successfully' }),
  findAll: jest.fn().mockResolvedValue(loansMock),
  returnLoan: jest
    .fn()
    .mockResolvedValue({ message: 'Loan returned successfully' }),
};
