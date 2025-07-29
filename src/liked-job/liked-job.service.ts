import { Injectable } from '@nestjs/common';
import { CreateLikedJobDto } from './dto/create-liked-job.dto';
import { UpdateLikedJobDto } from './dto/update-liked-job.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import CustomError from 'src/utils/custom-error';

@Injectable()
export class LikedJobService {
  constructor(private readonly prisma:PrismaService
  ){}
  async create(createLikedJobDto: CreateLikedJobDto,req:any) {
    const oldUser = await  this.prisma.users.findFirst({where:{email:req.user.email}})
    if(!oldUser){
      throw new CustomError(404,'User not found')
    }
    const oldJob = await this.prisma.likedJob.findFirst({where:{id:createLikedJobDto.jobId}})
    if(!oldJob){
      throw new CustomError(404,'Job not found')
    }
    const result = await this.prisma.likedJob.create({data:{userId:oldUser.id,jobId:oldJob.id},include:{job:true}})
    return result
  }

  async findAll(req:any) {
    const olduser = await  this.prisma.users.findFirst({where:{email:req.user.email}})
    if(!olduser){
      throw new CustomError(404,'User not found')
    }
    const result = await this.prisma.likedJob.findMany({where:{userId:olduser.id}})
    return result 
  }

  async findOne(id: number,req:any) {
    const olduser = await  this.prisma.users.findFirst({where:{email:req.user.email}})
    if(!olduser){
      throw new CustomError(404,'User not found')
    }
    const result = await this.prisma.likedJob.findFirst({where:{id:id,userId:olduser.id},include:{job:true}})
  return result    
  }

  

  async remove(id: number,req:any) {
    const oldUser = await this.prisma.users.findFirst({where:{email:req.user.email}})
    if(!oldUser){
      throw new CustomError(404,'User not found')
    }
    const result = await this.prisma.likedJob.delete({where:{userId:oldUser.id,id:id}})
    return result
  }
}
