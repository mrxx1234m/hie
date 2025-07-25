import { Injectable } from '@nestjs/common';
import { RegisterAuthorizationDto } from './dto/register-authorization.dto';
import findUserEmail from 'src/utils/find-user-email';
import CustomError from 'src/utils/custom-error';
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { LoginAuthorizationDto } from './dto/login-authorization.dto';

@Injectable()
export class AuthorizationService {
  constructor(private readonly prisma:PrismaService,private readonly authService:AuthService){}

  async register(body: RegisterAuthorizationDto) {
    const oldUser = await this.prisma.users.findFirst({where:{email:body.email}})
    if(oldUser){
      throw new CustomError(403,'Already user register')
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const result = await this.prisma.users.create({data:{fullname:body.fullName,email:body.email,password:hashedPassword}})
    const email = result.email
    const token = await this.authService.createAccessToken({email})
    return {result,token}
  }

  async login(body:LoginAuthorizationDto){
    const oldUser = await findUserEmail(body.email)
    if(!oldUser){
      throw new CustomError(404,'User not found')
    }
    const isMatch = await bcrypt.compare(body.password,oldUser.password)
    if(!isMatch){
      throw new CustomError(400,'Email or password false')
    }
    const email = oldUser.email
    const token = await this.authService.createAccessToken({email})
    return {result:oldUser,token}


  }

  
}
