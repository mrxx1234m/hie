import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, UseGuards } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from './multer.config';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('upload')
export class UploadController {
  // constructor(private readonly uploadService: UploadService) {}
  @ApiOperation({summary:'One photo add'})
  @Post('single')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image',multerConfig))
  uploadSingle(@UploadedFile() file:Express.Multer.File){
    return{
      image_path:`${process.env.IMAGES_BASE_URL}/${file.path}`,
     
    }
  }
  @Post('multiple')
  @UseInterceptors(FilesInterceptor('images', 10, multerConfig))
  @UseGuards(AuthGuard)
  uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);
    let images_paths:any = []
    for (const file of files){
      images_paths.push(`${process.env.IMAGES_BASE_URL}/${file.path}`)
    }
    return images_paths
    
  }

}
