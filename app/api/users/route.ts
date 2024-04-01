import prisma from "@/prisma/client";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request:NextRequest){
    const user = await prisma.user.findMany({orderBy:{name: "asc"}});
    return NextResponse.json(user)
}