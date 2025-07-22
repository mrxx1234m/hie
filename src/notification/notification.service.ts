import { Injectable } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { SendNotificationMailAllUserDto, SendNotificationMailDto, SendNotificationMailTariffUserDto } from './dto/notificatioin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailQueueService } from 'src/email-queue/email-queue.service';

@Injectable()
export class NotificationService {
    constructor(private readonly mailService:MailService ,private prisma:PrismaService,private readonly emailQueue: EmailQueueService){}
    async sendNotificatinMail(body:SendNotificationMailDto){
        const {email,title,description} = body
        const data = await this.mailService.sendNotificationMail(email,title,description)
        return data
    }
    async sendNotificationEmailAllUser(body:SendNotificationMailAllUserDto){
        const {title,description} = body
        const users = await this.prisma.users.findMany({select:{email:true}})
        const emails = await users.map((u)=>u.email)
        
        // const data = await this.emailQueue.sendBulk(emails,title,description)
         for(let user of emails){
            await this.mailService.sendNotificationMail(user,title,description)
        }
        
        return emails
    }
    // async sendNotificationEmailTariffUser(body:SendNotificationMailTariffUserDto){
    //     const {tariff,title,description} = body
    //     const users = await this.prisma.users.findMany()
    //     for(let user of users){
    //         await this.emailQueue.sendBulk(user.,title,description)
    //     }
    // }
}
