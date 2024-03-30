import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { EntityManager, Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const author = this.entityManager.create(Author, createAuthorDto);
    await this.entityManager.save(author);
  }

  async findAll() {
    return this.authorsRepository.find();
  }

  async findOne(id: number) {
    return this.authorsRepository.findOne({
      where: {
        id: id,
      },
      relations: { books: true },
    });
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return await this.authorsRepository.update(id, updateAuthorDto);
  }

  async remove(id: number) {
    return this.authorsRepository.delete(id);
  }
}
