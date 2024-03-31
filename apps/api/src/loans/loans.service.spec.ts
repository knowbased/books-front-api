import { Test, TestingModule } from '@nestjs/testing';
import { LoansService } from './loans.service';
import { Loan } from './entities/loan.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BooksService } from '../books/books.service';

describe('LoansService', () => {
  let service: LoansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoansService,
        { provide: getRepositoryToken(Loan), useValue: {} },
        { provide: BooksService, useValue: {} },
      ],
    }).compile();

    service = module.get<LoansService>(LoansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
