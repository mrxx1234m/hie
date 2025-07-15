import { PrismaService } from "src/prisma/prisma.service"

const findUserEmail = async (email:string)=>{
    const prisma = new PrismaService()
    const result = await prisma.users.findFirst({where:{email:email}})
    return result
}

export default findUserEmail