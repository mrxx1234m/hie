import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CvService {
  constructor(private readonly prisma:PrismaService){}
  async create(createCvDto: CreateCvDto) {

    const result = await this.prisma.cv.create({
      data: {
        fullName: createCvDto.fullName,
        email: createCvDto.email,
        phone: createCvDto.phone,
        birthday: new Date(createCvDto.birthday),
        locatioin: createCvDto.locatioin, // yoki to'g'rilangan bo‘lsa: location
        descriptioin: createCvDto.descriptioin, // yoki description
        userId: createCvDto.userId,
    
        experience: {
          create: createCvDto.experience.map((exp) => ({
            companyName: exp.companyName,
            position: exp.position,
            startWork: new Date(exp.startWork),
            endWork: new Date(exp.endWork),
            description: exp.description,
          })),
        },
    
        education: {
          create: createCvDto.education.map((edu) => ({
            educationName: edu.educationName,
            level: edu.level,
            specialty: edu.specialty,
            startEducation: new Date(edu.startEducation),
            endEducation: new Date(edu.endEducation),
          })),
        },
    
        languages: {
          create: createCvDto.languages.map((lang) => ({
            lang: lang.lang,
            level: lang.level,
          })),
        },
    
        skills: {
          create: createCvDto.skills.map((skill) => ({
            name: skill.name,
          })),
        },
      },
      include: {
        experience: true,
        education: true,
        languages: true,
        skills: true,
      },
    });
    
    return result;
    
  }

  findAll() {
    return this.prisma.cv.findMany({include:{skills:true,languages:true,experience:true,education:true,users:true}});
  }

  findOne(id: number) {
    return this.prisma.cv.findMany({where:{id:id},include:{skills:true,languages:true,experience:true,education:true,users:true}});
  }

  update(id: number, updateCvDto: UpdateCvDto) {
    return `This action updates a #${id} cv`;
  }

  remove(id: number) {
    return `This action removes a #${id} cv`;
  }
}
