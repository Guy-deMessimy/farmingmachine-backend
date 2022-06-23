import { Prisma } from '@prisma/client';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  readonly limit: number;

  @IsOptional()
  @IsPositive()
  readonly offset: number;

  @IsOptional()
  readonly orderBy: Prisma.SortOrder;

  @IsOptional()
  readonly cursor: Prisma.UserWhereUniqueInput;

  @IsOptional()
  readonly where: number | Prisma.IntFilter;
}
