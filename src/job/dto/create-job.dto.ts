import {   ApiProperty } from "@nestjs/swagger";
import { IsDate, isNumber, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class CreateJobDto {
    @ApiProperty({example:'Qurulish uchun ishchi kerak',description:'Ish nomi yoki shunga oxsash narsa uchun'})
    @IsString()
    title:string

    @ApiProperty({example:"Uzbekistan",description:"Davlat nomi"})
    @IsString()
    country:string

    @ApiProperty({example:'3000',description:'Maoush'})
    @IsNumber()
    salary:number

    @ApiProperty({example:18,description:"IShga kirish mumkun bo'lgan eng kichik yosh"})
    @IsNumber()
    minAge:number

    @ApiProperty({example:45,description:"Ishga kirish mumkun bo'lgan eng katta yosh"})
    @IsNumber()
    maxAge:number

    @ApiProperty({example:12,description:'Ish qancha vaqt davom etishi'})
    @IsNumber()
    duration:number

    @ApiProperty({example:'2025-12-01',description:'Ish boshlanish vaqti'})
    @IsDate()
    startWork:Date

    @ApiProperty({example:'Ish haqida',description:'Ish haqida toliq malumot'})
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
    @IsNumber()
    categoryId:number

}


