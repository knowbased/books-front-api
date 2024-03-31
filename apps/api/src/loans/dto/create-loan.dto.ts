import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateLoanDto {
  @IsNotEmpty({ message: 'Book ID cannot be empty' })
  @IsNumber({}, { message: 'Book ID must be a number' })
  @IsPositive({ message: 'Book ID must be a positive number' })
  bookId: number;

  @IsNotEmpty({ message: 'User name cannot be empty' })
  @IsString({ message: 'User name must be a string' })
  userName: string;

  @IsNotEmpty({ message: 'Due date cannot be empty' })
  @IsDateString()
  dueDate: Date;
}
