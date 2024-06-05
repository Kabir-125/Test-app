import prisma from "@/lib/prisma";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export async function POST (request: Request ) {
    const { title, content, id } = await request.json();
    const post = await prisma.post.create({
        data:{
            title: title,
            content: content,
            authorId: parseInt(id)
        }
    })
     
    return new NextResponse( post, {status: 200});
}

export async function GET (request: NextRequest) {;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id') || '';
    
    const numberOfPosts = await prisma.post.count({
        where: {
            authorId: parseInt(id)
        }
    });
    
    return new NextResponse( numberOfPosts, {status: 200})
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

export async function PATCH (request: Request){
    const { updatedTitle, UpdatedContent, id } = await request.json();
    
    await prisma.post.update({
        where:{
            id: id
        },
        data:{
            title: updatedTitle,
            content: UpdatedContent
        }
    })
    return new NextResponse("", {status: 200})
}