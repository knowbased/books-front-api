import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksServiceMock } from './mocks/books.service.mock';
import { booksMock } from './mocks/books.mock';

describe('BooksController', () => {
  let controller: BooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [{ provide: BooksService, useClass: BooksServiceMock }],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      expect(controller.findAll()).resolves.toEqual(booksMock);
    });
  });

  describe('findOne', () => {
    it('should return a book', async () => {
      const id = 1;
      const book = booksMock.find((book) => book.id === id);
      expect(controller.findOne(id)).resolves.toEqual(book);
    });
  });

  describe('create', () => {
    it("should return { message: 'Book created successfully' }", async () => {
      const book = {
        title: 'Book Title',
        authorId: 1,
      };

      expect(await controller.create(book)).toEqual({
        message: 'Book created successfully',
      });
    });
  });

  describe('update', () => {
    it("should return { message: 'Book updated successfully' }", async () => {
      const id = 1;
      const book = {
        title: 'Book Title',
        authorId: 1,
      };

      expect(await controller.update(id, book)).toEqual({
        message: 'Book updated successfully',
      });
    });
  });

  describe('remove', () => {
    it("should return { message: 'Book deleted successfully' }", async () => {
      const id = 1;

      expect(await controller.remove(id)).toEqual({
        message: 'Book deleted successfully',
      });
    });
  });
});
