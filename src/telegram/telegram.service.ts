import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api'
import { PrismaService } from 'src/prisma/prisma.service';
import CustomError from 'src/utils/custom-error';

@Injectable()
export class TelegramService  implements OnModuleInit{
    private bot: TelegramBot;

    constructor(private readonly configService:ConfigService,private readonly prisma:PrismaService){}
    onModuleInit() {
        const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN')
        if(!token){
            throw new CustomError(500,'internal server error')
        }
        this.bot = new TelegramBot(token,{polling:true})

        this.bot.on('message',(msg)=>{
            const chatId = msg.chat.id;
            const userName = msg.from?.username
            

        })
    }

}
