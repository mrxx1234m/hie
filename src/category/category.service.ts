import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, CreateCategoryTranslateDto } from './dto/create-category.dto';
import { UpdateCategoryDto, UpdateCategoryTranslateDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import CustomError from 'src/utils/custom-error';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma:PrismaService){}
  async create(createCategoryDto: CreateCategoryDto) {
    const result = await this.prisma.category.create({data:{translation:{
      create:createCategoryDto.translation.map(t =>({
        language:t.language,
        name:t.name
      }))
    }},include:{
      translation:true
    }});
    return result
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  findOne(id: number) {
    return this.prisma.category.findFirst({where:{id:id}});
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.category.update({
      where: { id },
      data: {
        updateAt: new Date(),
      },
    });

    if (updateCategoryDto.translation && updateCategoryDto.translation.length > 0) {
      await this.prisma.categoryTranslate.deleteMany({
        where: { categoryId: id },
      });

      for (const trans of updateCategoryDto.translation || []) {
        await this.prisma.categoryTranslate.upsert({
          where: {
            categoryId_language: {
              categoryId: id,
              language: trans.language!, // ! => bu qiymat mavjud deb TypeScriptga aytamiz
            },
          },
          update: {
            name: trans.name!,
          },
          create: {
            categoryId: id,
            language: trans.language!,
            name: trans.name!,
          },
        });
      }
      

    return category;
  }}
  

  async remove(id: number) {
    const oldCategory = await this.prisma.category.findFirst({where:{id:id}})
    if(!oldCategory){
      throw new  CustomError(404,'Category not found')
    }
    const result = await this.prisma.category.delete({where:{id:id}})
    
    return result
  }
}
