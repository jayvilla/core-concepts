import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

/**
 * DTO for updating a user
 * Demonstrates PartialType utility and partial updates
 * PartialType makes all fields from CreateUserDto optional
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}

