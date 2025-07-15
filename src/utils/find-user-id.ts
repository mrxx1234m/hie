import { PrismaService } from "src/prisma/prisma.service"

const findUserId = async (id:any)=>{
    const prisma = new PrismaService()
    const result = await prisma.users.findFirst({where:{id:Number(id)}})
    return result
}

export default findUserId