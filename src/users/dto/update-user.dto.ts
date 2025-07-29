import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, Length, MinLength } from "class-validator";


export class UpdateUserDto extends PartialType(CreateUserDto) {
      @ApiProperty({example:'superadmin@gmail.com',description:'User email '})
            @IsOptional()
            @IsString()
            @IsEmail()
            email:string
        
            @IsOptional()
            @ApiProperty({example:"Admin",description:"User full name"})
            @IsString()
            @MinLength(3)
            fullName:string

            @IsOptional()
            @ApiProperty({example:"12345678"})
            @IsString()
            @Length(8,22)
            password:string
}
