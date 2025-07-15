import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GoogleStrategy } from './google.stategy';

@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService,GoogleStrategy],
  imports:[]
})
export class AuthorizationModule {}
