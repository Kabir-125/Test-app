import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export async function GET () {
    console.log("cron");
    
    const lastMessage = await prisma.checks.findFirst({
        select: {
            id: true
        },
        orderBy:{
            id: 'desc'
        }
    });
    const lastNo = parseInt(lastMessage.id);
    console.log(lastNo);
    if( lastNo>3 ){
        await prisma.checks.delete({
            where:{
                id: lastNo-2
            }
        })
    }
    await prisma.checks.create({
        data:{
            message: `checked the api for ${lastNo+1}th times!`
        }
    })
    
    return new NextResponse( "hello", {status: 200})
}