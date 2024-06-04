import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export async function GET (request:NextRequest, params:any) {
    const { email } =params.params;
    
    const user = await prisma.user.findUnique({
        where:{
            email:email
        }
    })

    return new NextResponse(JSON.stringify(user.id) , {status:200})
}