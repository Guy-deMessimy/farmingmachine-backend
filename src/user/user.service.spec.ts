import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ConfigModule],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when user with ID exists', () => {
      it('should return the user object', async () => {
        const userId = 1;
        const expectedUser = {
          email: 'john.doe@gmail.com',
          id: userId,
          name: 'doe',
        };

        const user = await service.user({ id: userId });
        expect(user).toEqual(expectedUser);
        console.log(user);
      });
    });
  });
});
