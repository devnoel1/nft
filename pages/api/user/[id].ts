import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) =>{
    const { id } = req.query

    const data = await prisma.user.findUnique({
            where:{
                id:id
            }
    })

    return res.status(200).json(data)
}