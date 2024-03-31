import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { AuthorsService } from 'src/authors/authors.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    private readonly authorsService: AuthorsService,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const { title, authorId } = createBookDto;

    const book = new Book();
    book.title = title;
    if (authorId) book.author = await this.authorsService.findOne(authorId);

    return this.booksRepository.save(book);
  }

  async findAll() {
    return this.booksRepository.find({
      relations: { author: true },
    });
  }

  async findOne(id: number) {
    const book = await this.booksRepository.findOne({
      where: {
        id: id,
      },
      relations: { author: true },
    });

    if (!book) throw new NotFoundException(`Book with ID ${id} not found`);

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const { title, authorId } = updateBookDto;

    const book = await this.booksRepository.findOne({ where: { id } });
    if (!book) throw new NotFoundException(`Book with ID ${id} not found`);

    if (authorId) book.author = await this.authorsService.findOne(authorId);
    if (title) book.title = title;

    return this.booksRepository.save(book);
  }

  async remove(id: number) {
    return this.booksRepository.delete(id);
  }
}
