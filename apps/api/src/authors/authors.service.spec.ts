import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { authorsMock } from './mocks/authors.mock';
import { AuthorsRepositoryMock } from './mocks/authors.repository.mock';
import { NotFoundException } from '@nestjs/common';

describe('AuthorsService', () => {
  let service: AuthorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        {
          provide: getRepositoryToken(Author),
          useValue: AuthorsRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of authors', async () => {
      jest.spyOn(AuthorsRepositoryMock, 'find').mockResolvedValue(authorsMock);
      expect(service.findAll()).resolves.toEqual(authorsMock);
    });
  });

  describe('findOne', () => {
    it('should return an author', async () => {
      jest
        .spyOn(AuthorsRepositoryMock, 'findOne')
        .mockResolvedValue(authorsMock[0]);
      expect(service.findOne(1)).resolves.toEqual(authorsMock[0]);
    });

    it('should throw an error if author is not found', async () => {
      jest.spyOn(AuthorsRepositoryMock, 'findOne').mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should return a book updated', async () => {
      const updateAuthorPayload = {
        fullName: 'new title',
      };

      jest.spyOn(AuthorsRepositoryMock, 'existsBy').mockResolvedValue(true);

      expect(service.update(1, updateAuthorPayload)).resolves.toEqual({
        message: 'Author updated successfully',
      });
    });

    it('should throw an error if author is not found', async () => {
      const updateAuthorPayload = {
        fullName: 'new title',
      };

      jest.spyOn(AuthorsRepositoryMock, 'existsBy').mockResolvedValue(false);

      await expect(
        service.update(1, updateAuthorPayload),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });
  describe('remove', () => {
    it('should return an author deleted', async () => {
      jest.spyOn(AuthorsRepositoryMock, 'existsBy').mockResolvedValue(true);

      expect(service.remove(1)).resolves.toEqual({
        message: 'Author deleted successfully',
      });
    });

    it('should throw an error if author is not found', async () => {
      jest.spyOn(AuthorsRepositoryMock, 'existsBy').mockResolvedValue(false);
      await expect(service.remove(1)).rejects.toBeInstanceOf(NotFoundException);
    });
  });
  describe('create', () => {
    it('should return an author created', async () => {
      const createAuthorPayload = {
        fullName: 'Author Name',
      };

      expect(service.create(createAuthorPayload)).resolves.toEqual({
        message: 'Author created successfully',
      });
    });
  });
});
