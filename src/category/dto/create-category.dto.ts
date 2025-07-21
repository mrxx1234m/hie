import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsString, ValidateNested } from "class-validator";

export class CreateCategoryTranslateDto {
    @ApiProperty({example:"uz",description:'qaysi tilda ekanligi'})
    @IsString()
    language:string

    @ApiProperty({example:"Quruvchi",description:"qaysi soha ekanligi"})
    @IsString()
    name:string
}

export class CreateCategoryDto {
    @ApiProperty({type:[CreateCategoryTranslateDto]})
    @IsArray()
    @ValidateNested({each:true})
    @Type(()=>CreateCategoryTranslateDto)
    translation:CreateCategoryTranslateDto[]
}