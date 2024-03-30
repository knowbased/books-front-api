import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { EntityManager, Repository } from 'typeorm';
import { Book } from 'src/books/entities/book.entity';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(Loan)
    private readonly loansRepository: Repository<Loan>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createLoanDto: CreateLoanDto) {
    const { bookId, dueDate, userName } = createLoanDto;

    const loan = new Loan();
    loan.dueDate = dueDate;
    loan.userName = userName;

    const book = await this.entityManager.findOneOrFail(Book, {
      where: { id: bookId },
    });

    if (!book) throw new NotFoundException('Loan not found');

    loan.book = book;

    return this.loansRepository.save(loan);
  }

  async findAll(): Promise<Loan[]> {
    return this.loansRepository.find({
      relations: ['book'],
    });
  }

  async returnLoan(id: number): Promise<Loan> {
    const loan = await this.loansRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!loan) {
      throw new NotFoundException('Loan not found');
    }

    loan.returnDate = new Date();
    return this.loansRepository.save(loan);
  }
}
