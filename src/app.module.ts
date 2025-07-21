import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizationModule } from './authorization/authorization.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [AuthorizationModule,PrismaModule, AuthModule,ConfigModule.forRoot({isGlobal: true,envFilePath:'.env'}), CategoryModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
