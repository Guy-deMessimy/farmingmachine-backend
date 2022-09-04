import { faker } from '@faker-js/faker';

export const User = {
  id: faker.datatype.number(2),
  email: faker.internet.email(),
  fullname: faker.name.fullName(),
};
