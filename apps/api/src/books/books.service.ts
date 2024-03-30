import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const book = this.entityManager.create(Book, createBookDto);
    await this.entityManager.save(book);
  }

  async findAll() {
    return this.booksRepository.find();
  }

  async findOne(id: number) {
    return this.booksRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return await this.booksRepository.update(id, updateBookDto);
  }

  async remove(id: number) {
    return this.booksRepository.delete(id);
  }
}
