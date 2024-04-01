import { Test, TestingModule } from '@nestjs/testing';
import { LoansService } from './loans.service';
import { Loan } from './entities/loan.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BooksService } from '../books/books.service';
import { LoanRepositoryMock } from './mocks/loans.repository.mock';
import { BooksServiceMock } from '../books/mocks/books.service.mock';
import { loansMock } from './mocks/loans.mock';
import { NotFoundException } from '@nestjs/common';

describe('LoansService', () => {
  let service: LoansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoansService,
        { provide: getRepositoryToken(Loan), useValue: LoanRepositoryMock },
        { provide: BooksService, useClass: BooksServiceMock },
      ],
    }).compile();

    service = module.get<LoansService>(LoansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a loan', async () => {
      const createLoanDto = {
        bookId: 1,
        dueDate: new Date(),
        userName: 'John Doe',
      };

      expect(service.create(createLoanDto)).resolves.toEqual({
        message: 'Loan created successfully',
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of loans', async () => {
      expect(service.findAll()).resolves.toEqual(loansMock);
    });
  });

  describe('returnLoan', () => {
    it('should return a loan returned successfully message', async () => {
      const id = 1;
      jest.spyOn(LoanRepositoryMock, 'findOne').mockResolvedValue(loansMock[0]);

      expect(service.returnLoan(id)).resolves.toEqual({
        message: 'Loan returned successfully',
      });
    });

    it('should throw an error if loan is not found', async () => {
      const id = 1;
      jest.spyOn(LoanRepositoryMock, 'findOne').mockResolvedValue(null);

      await expect(service.returnLoan(id)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
});
