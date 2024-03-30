import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Loan } from './entities/loan.entity';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  create(@Body() createLoanDto: CreateLoanDto) {
    return this.loansService.create(createLoanDto);
  }

  @Get()
  findAll() {
    return this.loansService.findAll();
  }

  @Patch(':id/return')
  returnLoan(@Param('id') id: string): Promise<Loan> {
    return this.loansService.returnLoan(+id);
  }
}
