import { ApiOperation, ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateLikedJobDto {
    @ApiProperty({example:1,description:'Job id'})
    @IsNumber()
    jobId:number
}
