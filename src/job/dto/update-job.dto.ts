import { PartialType } from '@nestjs/swagger';
import { CreateJobDto } from './create-job.dto';
import {   ApiProperty } from "@nestjs/swagger";
import { IsDate, isNumber, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class UpdateJobDto extends PartialType(CreateJobDto) {
        @ApiProperty({example:'Qurulish uchun ishchi kerak',description:'Ish nomi yoki shunga oxsash narsa uchun'})
        @IsOptional()
        @IsString()
        title:string
    
        @ApiProperty({example:"Uzbekistan",description:"Davlat nomi"})
        @IsOptional()
        @IsString()
        country:string
    
        @ApiProperty({example:'3000',description:'Maoush'})
        @IsOptional()
        @IsNumber()
        salary:number
    
        @ApiProperty({example:18,description:"IShga kirish mumkun bo'lgan eng kichik yosh"})
        @IsOptional()
        @IsNumber()
        minAge:number
    
        @ApiProperty({example:45,description:"Ishga kirish mumkun bo'lgan eng katta yosh"})
        @IsOptional()
        @IsNumber()
        maxAge:number
    
        @ApiProperty({example:12,description:'Ish qancha vaqt davom etishi'})
        @IsOptional()
        @IsNumber()
        duration:number
    
        @ApiProperty({example:'2025-12-01',description:'Ish boshlanish vaqti'})
        @IsOptional()
        @IsDate()
        startWork:Date
    
        @ApiProperty({example:'Ish haqida',description:'Ish haqida toliq malumot'})
        @IsOptional()
        @IsString()
        description:string
    
        @ApiProperty({example:'+998991234567',description:'Telefon nomer'})
        @IsOptional()
        @IsPhoneNumber()
        phone:string
    
        @ApiProperty({example:'https://t.me/telegram',description:'telegram link'})
        @IsOptional()
        @IsString()
        telegram:string
    
        @ApiProperty({example:'https://hie.pixl.uz/logo.png',description:'kompaniya logotipi'})
        @IsOptional()
        @IsString()
        logotip:string
    
        @ApiProperty({example:1,description:'Category id'})
        @IsOptional()
        @IsNumber()
        categoryId:number
    
}
