import { Prisma } from '@prisma/client';

export class User {
  limit?: number;
  offset?: number;
  cursor?: Prisma.UserWhereUniqueInput;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByWithRelationInput;
}
