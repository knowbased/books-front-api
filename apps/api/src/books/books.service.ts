import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { EntityManager, Repository } from 'typeorm';
import { Author } from 'src/authors/entities/author.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const { title, authorId } = createBookDto;

    const book = new Book();
    book.title = title;

    const author = await this.entityManager.findOneOrFail(Author, {
      where: { id: authorId },
    });

    if (!author) {
      throw new NotFoundException(`Author with ID ${authorId} not found`);
    }

    book.author = author;

    return this.entityManager.save(Book, book);
  }

  async findAll() {
    return this.booksRepository.find({
      relations: { author: true },
    });
  }

  async findOne(id: number) {
    return this.booksRepository.findOne({
      where: {
        id: id,
      },
      relations: { author: true },
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const { title, authorId } = updateBookDto;

    const book = await this.entityManager.findOne(Book, { where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    if (authorId) {
      const author = await this.entityManager.findOne(Author, {
        where: { id: authorId },
      });

      if (!author) {
        throw new NotFoundException(`Author with ID ${authorId} not found`);
      }
      book.author = author;
    }

    if (title) {
      book.title = title;
    }

    return this.entityManager.save(Book, book);
  }

  async remove(id: number) {
    return this.booksRepository.delete(id);
  }
}
