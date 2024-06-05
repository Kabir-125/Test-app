import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export async function GET( request:NextRequest, {params}:any ) {
    const [ id, page] = params.id;
    
    const posts = await prisma.post.findMany({
        skip: (page-1)*2,
        take: 2,
        where:{
            authorId: parseInt(id)
        },
        select:{
            id: true,
            title: true,
            content: true,
            authorId: true,
            createdAt: true,
            author: true
        },
        orderBy:{
            id: 'desc'
        }
    })
    

    return new NextResponse( JSON.stringify(posts), {status: 200});
}