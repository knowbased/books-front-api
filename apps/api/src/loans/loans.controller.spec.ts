import { Test, TestingModule } from '@nestjs/testing';
import { LoansController } from './loans.controller';
import { LoansService } from './loans.service';
import { LoanServiceMock } from './mocks/loan.service.mock';
import { loansMock } from './mocks/loans.mock';

describe('LoansController', () => {
  let controller: LoansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoansController],
      providers: [{ provide: LoansService, useValue: LoanServiceMock }],
    }).compile();

    controller = module.get<LoansController>(LoansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it("should return { message: 'Loan created successfully' }", async () => {
      const loan = {
        bookId: 1,
        dueDate: new Date(),
        userName: 'John Doe',
      };

      expect(await controller.create(loan)).toEqual({
        message: 'Loan created successfully',
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of loans', async () => {
      expect(controller.findAll()).resolves.toEqual(loansMock);
    });
  });

  describe('returnLoan', () => {
    it("should return a { message: 'Loan returned successfully' }", async () => {
      const id = 1;
      expect(controller.returnLoan(id)).resolves.toEqual({
        message: 'Loan returned successfully',
      });
    });
  });
});
