import {
  IsString,
  IsEmail,
  IsInt,
  Min,
  Max,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO for creating a user
 * Demonstrates validation decorators and data transfer objects
 */
export class CreateUserDto {
  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'User email address (must be unique)',
    example: 'john.doe@example.com',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User age',
    example: 25,
    minimum: 18,
    maximum: 120,
  })
  @IsInt()
  @Min(18)
  @Max(120)
  age: number;

  @ApiPropertyOptional({
    description: 'User biography or description',
    example: 'Software developer passionate about clean code',
    minLength: 5,
    maxLength: 100,
  })
  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(100)
  bio?: string;
}
