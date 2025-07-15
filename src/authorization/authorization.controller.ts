import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, UseGuards, Req } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { RegisterAuthorizationDto } from './dto/register-authorization.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LoginAuthorizationDto } from './dto/login-authorization.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Controller('authorization')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService,private readonly configService:ConfigService) {}

  @Post('register')
  register(@Body() createAuthorizationDto: RegisterAuthorizationDto) {
    return this.authorizationService.register(createAuthorizationDto);
  }

  @Post('login')
  login(@Body() body:LoginAuthorizationDto){
    return this.authorizationService.login(body)
  }

  @Get('google')
  async googleLogin( @Res() res: Response) {
    
    return res.redirect('/authorization/google/redirect-to-google');
  }

  // 2. Google auth uchun redirect (faqat yo‘naltirish uchun)
  @Get('google/redirect-to-google')
  @UseGuards(AuthGuard('google'))
  async redirectToGoogle(@Req() req) {
    // bu yerga hech qachon kelmaydi
  }

  // 3. Google callback – login muvaffaqiyatli tugaganda
  @Get('google/redirect')
  
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() req: any, @Res() res: Response) {
    const { user, token } = req.user;
    const ref = req.cookies?.ref;

    if (ref) {
      res.clearCookie('ref');
    }

    const frontendUrl = this.configService.get<string>('FRONTEND_URL');
    return res.redirect(`${frontendUrl}/oauth-success?token=${token}`);
  }

}
