import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const cats = await prisma.cat.findMany({
            take: 2
        });
        prisma.$disconnect();
        return NextResponse.json({cats})
    } catch(error) {
        console.error(error)
    }
}
