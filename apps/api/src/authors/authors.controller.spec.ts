import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { authorsMock } from './mocks/authors.mock';
import { AuthorsServiceMock } from './mocks/authors.service.mock';

describe('AuthorsController', () => {
  let controller: AuthorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorsController],
      providers: [{ provide: AuthorsService, useValue: AuthorsServiceMock }],
    }).compile();

    controller = module.get<AuthorsController>(AuthorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of authors', async () => {
      expect(controller.findAll()).resolves.toEqual(authorsMock);
    });
  });

  describe('findOne', () => {
    it('should return a author', async () => {
      const id = 1;
      const author = authorsMock.find((author) => author.id === id);
      expect(controller.findOne(id)).resolves.toEqual(author);
    });
  });

  describe('create', () => {
    it("should return { message: 'Author created successfully' }", async () => {
      const author = {
        fullName: 'name',
      };

      expect(await controller.create(author)).toEqual({
        message: 'Author created successfully',
      });
    });
  });

  describe('update', () => {
    it("should return { message: 'Author updated successfully' }", async () => {
      const id = 1;
      const author = {
        fullName: 'author name',
      };

      expect(await controller.update(id, author)).toEqual({
        message: 'Author updated successfully',
      });
    });
  });

  describe('remove', () => {
    it("should return { message: 'Author deleted successfully' }", async () => {
      const id = 1;

      expect(await controller.remove(id)).toEqual({
        message: 'Author deleted successfully',
      });
    });
  });
});
