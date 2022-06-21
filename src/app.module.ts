import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [PrismaModule, UserModule, PostModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
