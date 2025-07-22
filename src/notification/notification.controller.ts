import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SendNotificationMailAllUserDto, SendNotificationMailDto } from './dto/notificatioin.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('notification')
export class NotificationController {
    constructor(private readonly service:NotificationService){}
    @ApiOperation({summary:"Foydalanuvchiga habar yuborish uchun faqat admin"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    @Post()
    async sendNotificationEmail(@Body() body:SendNotificationMailDto){
        const data = await this.service.sendNotificatinMail(body)
        return data
    }
    @ApiOperation({summary:'Barcha foydalanuvchilar uchun',})
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    @Post('all')
    async sendNotificationEmailAllUser(@Body() body:SendNotificationMailAllUserDto){
        const data = await this.service.sendNotificationEmailAllUser(body)
        return data
    }

}

