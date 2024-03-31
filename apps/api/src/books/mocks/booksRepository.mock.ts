import { booksMock } from './books.mock';

export const BooksRepositoryMock = {
  findOne: jest.fn(),
  find: jest.fn().mockResolvedValue(booksMock),
  delete: jest.fn(),
  save: jest.fn(),
  exists: jest.fn(),
};
