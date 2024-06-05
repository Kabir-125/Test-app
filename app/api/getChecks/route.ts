import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export async function GET () {
    const checksList = await prisma.checks.findMany();
    return new NextResponse( JSON.stringify(checksList), {status: 200})
}