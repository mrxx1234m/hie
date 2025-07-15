import { IsEmail, IsEnum, IsNumber, IsOptional, IsPhoneNumber, IsString, MaxLength, min, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginAuthorizationDto{
    @ApiProperty({example:"superadmin@gmail.com",description:"Foydalanuvchi emaili"})
    @IsString()
    @IsEmail()
    email:string

    @ApiProperty({example:"12345678", description:"Minimum 8 ta belgi maximum 22 ta"})
    @IsString()
    @MinLength(8)
    @MaxLength(22)
    password:string
}