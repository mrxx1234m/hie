import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizationModule } from './authorization/authorization.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthorizationModule,PrismaModule, AuthModule,ConfigModule.forRoot({isGlobal: true,envFilePath:'.env'}),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
