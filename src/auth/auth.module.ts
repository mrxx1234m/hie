import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports:[ JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('ACCESS_SECRET'),
      signOptions: {
        expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
      },
    }),
    inject: [ConfigService],
  }),],
  providers: [AuthService],
  exports:[AuthService]
})
export class AuthModule {}
