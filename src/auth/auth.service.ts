import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private jwtService:JwtService,private configSerivce:ConfigService,private prisma:PrismaService){}
    async createAccessToken(payload:{email:string}){
        try{
            return await this.jwtService.signAsync(payload,{
                secret: this.configSerivce.get('JWT_SECRET'),
                expiresIn: this.configSerivce.get<string>('ACCESS_TOKEN_EXPIRES_IN') || '48h'
            })

        }catch(err){
            console.error(err.message)
            throw new UnauthorizedException(err.message)
        }

    }
    async verifyAccessToken(token:string){
        try{
            return await this.jwtService.verifyAsync(token,{
                secret:this.configSerivce.get<string>('JWT_SECRET')
            })

        }catch(err){
            return false
        }
    }
}
 