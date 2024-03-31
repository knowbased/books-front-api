import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { Repository } from 'typeorm';
import { BooksService } from '../books/books.service';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(Loan)
    private readonly loansRepository: Repository<Loan>,
    private readonly booksService: BooksService,
  ) {}

  async create(createLoanDto: CreateLoanDto) {
    const { bookId, dueDate, userName } = createLoanDto;

    const loan = new Loan();
    loan.dueDate = dueDate;
    loan.userName = userName;

    loan.book = await this.booksService.findOne(bookId);

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
