import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import findUserEmail from 'src/utils/find-user-email';
import CustomError from 'src/utils/custom-error';

@Injectable()
export class JobService {
  constructor(private readonly prisma:PrismaService){}
  async create(createJobDto: CreateJobDto,req:any) {
    const oldUser = await this.prisma.users.findFirst({where:{email:req.user.email}})
    if(!oldUser){
      throw new CustomError(404,'User not found')
    }
    const result = await this.prisma.job.create({data:{
      title:createJobDto.title,
      description:createJobDto.description,
      phone:createJobDto.phone,
      telegram:createJobDto.telegram,
      duration:createJobDto.duration,
      startWork:createJobDto.startWork,
      minAge:createJobDto.minAge,
      maxAge:createJobDto.maxAge,
      salary:createJobDto.salary,
      country:createJobDto.country,
      categoryId:createJobDto.categoryId,
      userId:oldUser.id
    },include:{users:true,category:true}})
    return result
  }

  findAll() {
    return this.prisma.job.findMany()
  }

  findOne(id: number) {
    return this.prisma.job.findFirst({where:{id:id}})
  }

  async update(id: number, updateJobDto: UpdateJobDto,req:any) {
    const oldUser = await findUserEmail(req.user.email)
    if(!oldUser){
      throw new CustomError(404,'User not found')
    }
    const oldJob = await this.prisma.job.findFirst({where:{id:id}})
    if(!oldJob){
      throw new CustomError(404,'Jobs not found')
    }
    if(oldJob.userId != oldUser.id){
      throw new CustomError(403,'Forbidden')
    }
    const result = await this.prisma.job.update({where:{id:id},data:updateJobDto})
    return result
  }

  async remove(id: number,req:any) {
    const oldUser = await findUserEmail(req.user.email)
    if(!oldUser){
      throw new CustomError(404,'User not found')
    }
    const oldJob = await this.prisma.job.findFirst({where:{id:id}})
    if(!oldJob){
      throw new CustomError(404,"job not found")
    }
    if(oldUser.id != oldJob.userId){
      throw new CustomError(403,'Notogri user boshqa elonni ochirmoqchi')
    }
    const result = await this.prisma.job.delete({where:{id:id}})
    return result
  }
}
