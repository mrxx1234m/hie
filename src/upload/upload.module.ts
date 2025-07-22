import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { FileUploadService } from './upload.service';

@Module({
  controllers: [UploadController],
  providers: [FileUploadService]
})
export class UploadModule {}
