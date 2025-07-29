import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import CustomError from 'src/utils/custom-error';

@Injectable()
export class UsersService {
  constructor(private readonly prisma:PrismaService){}
  async create(createUserDto: CreateUserDto) {
   const oldUser = await this.prisma.users.findFirst(({where:{email:createUserDto.email}}))
   if(!oldUser){
    throw new CustomError(404,'User not found')
   }
  }

  findAll() {
    return this.prisma.users.findMany({include:{job:true,cv:{include:{experience: true,
      education: true,
      languages: true,
      skills: true,}}}});
  }

  findOne(id: number) {
    return this.prisma.users.findFirst({where:{id:id},include:{job:true,cv:{include:{experience:true,education:true,languages:true,skills:true}}}});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const oldUser = await this.prisma.users.update({where:{email:updateUserDto.email},data:updateUserDto})
  }

  async remove(id: number) {
    const oldUser = await this.prisma.users.findFirst({where:{id:id}})
    if(!oldUser){
      throw new CustomError(404,'User not found')
    }
    const result = await this.prisma.users.delete({where:{id:id}})
    return result
  }
}
