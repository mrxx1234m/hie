import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
export class UpdateCategoryTranslateDto {
   

    @ApiProperty({ example: "uz", description: 'qaysi tilda ekanligi' })
    @IsOptional()
    @IsString()
    language?: string;

    @ApiProperty({ example: "Quruvchi", description: "qaysi soha ekanligi" })
    @IsOptional()
    @IsString()
    name?: string;
}

export class UpdateCategoryDto {
    @ApiProperty({ type: [UpdateCategoryTranslateDto] })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateCategoryTranslateDto)
    translation?: UpdateCategoryTranslateDto[];
}
