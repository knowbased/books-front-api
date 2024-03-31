import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { BooksRepositoryMock } from './mocks/booksRepository.mock';
import { Book } from './entities/book.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthorsService } from '../authors/authors.service';
import { booksMock } from './mocks/books.mock';
import { NotFoundException } from '@nestjs/common';
import { AuthorsServiceMock } from './mocks/authors.service.mock';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        { provide: getRepositoryToken(Book), useValue: BooksRepositoryMock },
        { provide: AuthorsService, useValue: AuthorsServiceMock },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      expect(service.findAll()).resolves.toEqual(booksMock);
    });
  });

  describe('findOne', () => {
    it('should return a book', async () => {
      jest
        .spyOn(BooksRepositoryMock, 'findOne')
        .mockResolvedValue(booksMock[0]);
      expect(service.findOne(1)).resolves.toEqual(booksMock[0]);
    });

    it('should throw an error if book is not found', async () => {
      jest.spyOn(BooksRepositoryMock, 'findOne').mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should return a book updated', async () => {
      const updateBookPayload = {
        title: 'new title',
        authorId: 1,
      };

      const author = {
        id: 1,
        fullName: 'Author Name',
      };

      jest
        .spyOn(BooksRepositoryMock, 'findOne')
        .mockResolvedValue(booksMock[0]);

      jest.spyOn(AuthorsServiceMock, 'findOne').mockResolvedValue(author);

      expect(service.update(1, updateBookPayload)).resolves.toEqual({
        ...booksMock[0],
        title: 'new title',
        author: author,
      });
    });

    it('should throw an error if book is not found', async () => {
      const book = {
        title: 'Book Title',
        authorId: 1,
      };
      jest.spyOn(BooksRepositoryMock, 'findOne').mockResolvedValue(null);
      await expect(service.update(1, book)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
  describe('remove', () => {
    it('should return a book deleted', async () => {
      jest.spyOn(BooksRepositoryMock, 'exists').mockResolvedValue(true);

      expect(service.remove(1)).resolves.toEqual({
        message: 'Book deleted successfully',
      });
    });

    it('should throw an error if book is not found', async () => {
      jest.spyOn(BooksRepositoryMock, 'exists').mockResolvedValue(false);
      await expect(service.remove(1)).rejects.toBeInstanceOf(NotFoundException);
    });
  });
  describe('create', () => {
    it('should return a book created', async () => {
      const createBookPayload = {
        title: 'Book Title',
        authorId: 1,
      };

      const author = {
        id: 1,
        fullName: 'Author Name',
      };

      jest.spyOn(AuthorsServiceMock, 'findOne').mockResolvedValue(author);

      expect(service.create(createBookPayload)).resolves.toEqual({
        message: 'Book created successfully',
      });
    });
  });
});
