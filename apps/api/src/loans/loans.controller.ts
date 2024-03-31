import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Loan } from './entities/loan.entity';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  create(@Body(ValidationPipe) createLoanDto: CreateLoanDto) {
    return this.loansService.create(createLoanDto);
  }

  @Get()
  findAll() {
    return this.loansService.findAll();
  }

  @Patch(':id/return')
  returnLoan(@Param('id', ParseIntPipe) id: number): Promise<Loan> {
    return this.loansService.returnLoan(id);
  }
}
