import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const author = this.authorsRepository.create(createAuthorDto);
    await this.authorsRepository.save(author);
  }

  async findAll() {
    return this.authorsRepository.find();
  }

  async findOne(id: number) {
    const author = await this.authorsRepository.findOne({
      where: {
        id: id,
      },
      relations: { books: true },
    });

    if (!author) throw new NotFoundException(`Author with ID ${id} not found`);

    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return await this.authorsRepository.update(id, updateAuthorDto);
  }

  async remove(id: number) {
    return this.authorsRepository.delete(id);
  }
}
