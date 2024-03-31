import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty({ message: 'Full name cannot be empty' })
  @IsString({ message: 'Full name must be a string' })
  fullName: string;
}
