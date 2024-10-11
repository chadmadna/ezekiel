import {
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { QueryFailedError, EntityNotFoundError } from 'typeorm';

export function handleDBErr(error: any): never {
  if (error instanceof QueryFailedError) {
    const errorCode = (error as any).code;

    switch (errorCode) {
      case '23505':
        // Unique violation
        throw new BadRequestException(
          'Duplicate entry: cannot add entry with existing fields',
        );
      case '23503':
        // Foreign key violation
        throw new BadRequestException(
          'Invalid entry: cannot add entry with invalid reference',
        );
      case '23502':
        // Not null violation
        throw new BadRequestException(
          'Invalid entry: a required field is missing',
        );
      case '23514':
        // Check violation
        throw new BadRequestException('A value fails a check constraint');
      case '22P02':
        // Invalid text representation (e.g., UUID format errors)
        throw new BadRequestException('Invalid input format');
      case '42703':
        // Undefined column
        throw new BadRequestException('Invalid column name in the query');
      case '42883':
        // Undefined function
        throw new BadRequestException('Function does not exist in the query');
      case '42P01':
        // Undefined table
        throw new BadRequestException('Table does not exist');
      default:
        throw new InternalServerErrorException('A database error occurred');
    }
  }

  // Handle TypeORM EntityNotFoundError
  if (error instanceof EntityNotFoundError) {
    throw new NotFoundException('Record not found');
  }

  // Unknown error, rethrow
  throw new InternalServerErrorException('Unknown database error', error);
}
