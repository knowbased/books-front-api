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

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  async create(@Body(ValidationPipe) createLoanDto: CreateLoanDto) {
    return this.loansService.create(createLoanDto);
  }

  @Get()
  async findAll() {
    return this.loansService.findAll();
  }

  @Patch(':id/return')
  async returnLoan(@Param('id', ParseIntPipe) id: number) {
    return this.loansService.returnLoan(id);
  }
}
