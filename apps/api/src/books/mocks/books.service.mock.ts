import { booksMock } from './books.mock';

export class BooksServiceMock {
  findAll = jest.fn().mockResolvedValue(booksMock);
  findOne = jest.fn().mockImplementation((id: number) => {
    return booksMock.find((book) => book.id === id);
  });
  create = jest
    .fn()
    .mockResolvedValue({ message: 'Book created successfully' });
  update = jest
    .fn()
    .mockResolvedValue({ message: 'Book updated successfully' });
  remove = jest
    .fn()
    .mockResolvedValue({ message: 'Book deleted successfully' });
}
