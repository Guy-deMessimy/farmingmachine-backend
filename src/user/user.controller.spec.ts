import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '../../test/fakedata';

describe('UserController', () => {
  let userController: UserController;
  const mockPrisma = {
    user: {
      findUnique: () =>
        Promise.resolve([
          { data: { id: User.id, email: User.email, name: User.fullname } },
        ]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ConfigModule],
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile();

    userController = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('findUnique', () => {
    describe('when user with id exists', () => {
      it('should return the user object', async () => {
        const expectedUser = [
          {
            data: {
              id: User.id,
              email: User.email,
              name: User.fullname,
            },
          },
        ];
        await expect(
          userController.getUserById(User.id),
        ).resolves.toStrictEqual(expectedUser);
      });
    });
    describe('otherwise', () => {
      it('should throw the NotFoundException', async () => {
        try {
        } catch (err) {}
      });
    });
  });
});
