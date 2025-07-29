import { Module } from '@nestjs/common';
import { LikedJobService } from './liked-job.service';
import { LikedJobController } from './liked-job.controller';

@Module({
  controllers: [LikedJobController],
  providers: [LikedJobService],
})
export class LikedJobModule {}
