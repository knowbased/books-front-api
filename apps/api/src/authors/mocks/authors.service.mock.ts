import { authorsMock } from './authors.mock';

export const AuthorsServiceMock = {
  findAll: jest.fn().mockResolvedValue(authorsMock),
  findOne: jest.fn().mockImplementation((id: number) => {
    return authorsMock.find((author) => author.id === id);
  }),
  create: jest
    .fn()
    .mockResolvedValue({ message: 'Author created successfully' }),
  update: jest
    .fn()
    .mockResolvedValue({ message: 'Author updated successfully' }),
  remove: jest
    .fn()
    .mockResolvedValue({ message: 'Author deleted successfully' }),
};
