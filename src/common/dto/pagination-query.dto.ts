import { Prisma } from '@prisma/client';
import { IsOptional, IsPositive } from 'class-validator';

interface UserInput {
  id: number | Prisma.IntFilter;
}

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;

  @IsOptional()
  orderBy: Prisma.SortOrder;

  @IsOptional()
  cursor: Prisma.UserWhereUniqueInput;

  @IsOptional()
  where: number | Prisma.IntFilter;
}
