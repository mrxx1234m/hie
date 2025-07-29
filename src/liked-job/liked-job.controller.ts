import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { LikedJobService } from './liked-job.service';
import { CreateLikedJobDto } from './dto/create-liked-job.dto';
import { UpdateLikedJobDto } from './dto/update-liked-job.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('liked-job')
export class LikedJobController {
  constructor(private readonly likedJobService: LikedJobService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  create(@Body() createLikedJobDto: CreateLikedJobDto,@Req()  req:any) {
    return this.likedJobService.create(createLikedJobDto,req);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  findAll(@Req() req:any) {
    return this.likedJobService.findAll(req);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string,@Req() req:any) {
    return this.likedJobService.findOne(+id,req);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string,@Req() req:any) {
    return this.likedJobService.remove(+id,req);
  }
}
