import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET () {
    var lastNo = 0;
    lastNo = await prisma.checks.findOne({
        take: 1,
        select: {
            id: true
        },
        orderBy:{
            id: 'desc'
        }
    });

    if( lastNo>3 ){
        await prisma.checks.delete({
            where:{
                id: lastNo-3
            }
        })
    }
    await prisma.checks.create({
        data:{
            message: `checked the api for ${lastNo+1}th times!`
        }
    })
    
    return new NextResponse( "", {status: 200})
}