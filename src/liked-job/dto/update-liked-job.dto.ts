import { PartialType } from '@nestjs/swagger';
import { CreateLikedJobDto } from './create-liked-job.dto';

export class UpdateLikedJobDto extends PartialType(CreateLikedJobDto) {}
