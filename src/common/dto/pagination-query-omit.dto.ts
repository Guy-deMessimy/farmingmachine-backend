import { OmitType } from '@nestjs/swagger';
import { PaginationQueryDto } from './pagination-query.dto';

export class PaginationQueryOmitDto extends OmitType(PaginationQueryDto, [
  'where',
] as const) {}
