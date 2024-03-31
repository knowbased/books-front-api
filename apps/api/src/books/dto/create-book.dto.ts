import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty({ message: 'Title cannot be empty' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsOptional()
  @IsInt({ message: 'Author ID must be an integer' })
  @IsPositive({ message: 'Author ID must be a positive integer' })
  authorId: number;
}
