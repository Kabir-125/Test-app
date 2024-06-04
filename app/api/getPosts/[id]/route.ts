import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET( request:NextRequest, {params}:any ) {
    const posts = await prisma.post.findMany({
        where:{
            authorId: 4
        },
        select:{
            id: true,
            title: true,
            content: true,
            authorId: true,
            createdAt: true,
            author: true
        }
    })
    

    return new NextResponse( JSON.stringify(posts), {status: 200});
}