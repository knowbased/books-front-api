import { loansMock } from './loans.mock';

export const LoanRepositoryMock = {
  create: jest.fn().mockResolvedValue({ message: 'Loan created successfully' }),
  find: jest.fn().mockResolvedValue(loansMock),
  save: jest.fn(),
  findOne: jest.fn(),
};
