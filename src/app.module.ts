import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [PrismaModule, UserModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
