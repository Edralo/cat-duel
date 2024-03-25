import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    const prisma = new PrismaClient();
    try {
        const cats = await prisma.cat.findMany({
            orderBy: {
                rating: 'desc'
            }
        });
        prisma.$disconnect();
        return NextResponse.json({cats})
    } catch(error) {
        console.error(error)
    }
}