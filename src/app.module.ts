import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizationModule } from './authorization/authorization.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { JobModule } from './job/job.module';
import { UploadModule } from './upload/upload.module';
import { MailModule } from './mail/mail.module';
import { EmailQueueModule } from './email-queue/email-queue.module';
import { NotificationModule } from './notification/notification.module';
import { TelegramModule } from './telegram/telegram.module';
import { CvModule } from './cv/cv.module';


@Module({
  imports: [AuthorizationModule,PrismaModule, AuthModule,ConfigModule.forRoot({isGlobal: true,envFilePath:'.env'}), CategoryModule, JobModule, UploadModule, MailModule, EmailQueueModule,NotificationModule, TelegramModule, CvModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
