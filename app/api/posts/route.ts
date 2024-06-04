import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: Request ) {
    const { title, content, params } = await request.json();
    console.log( title, content, params );
    const post = await prisma.post.create({
        data:{
            title: title,
            content: content,
            authorId: parseInt(params.id)
        }
    })
     
    return new NextResponse( post, {status: 200});
}

export async function DELETE (request: Request){
    const { id } = await request.json();
    
    const deletedPost = await prisma.post.delete({
        where:{
            id: id
        }
    })
    return new NextResponse ( deletedPost, { status: 200 } );
}