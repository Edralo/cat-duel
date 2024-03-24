import { Prisma, PrismaClient, Cat } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    const prisma = new PrismaClient();
    try {
        const cats = await prisma.$queryRaw<Cat[]>(
            Prisma.sql`SELECT * FROM cat_duel."Cat" ORDER BY RANDOM() LIMIT 2`
        );
        prisma.$disconnect();
        return NextResponse.json({cats})
    } catch(error) {
        console.error(error)
    }
}

export async function POST(request: Request) {
    const kFactor = 30;
    const prisma = new PrismaClient();

    try {
        const data = await request.json();
        const winnerCat = await prisma.cat.findUnique({
            where: {
                id: data.winner
            }
        })
        const loserCat = await prisma.cat.findUnique({
            where: {
                id: data.loser
            }
        })

        if (!winnerCat || !loserCat)
            throw new Error(`Error while fetching the current dueling cats`);

        const winnerCatProbability = calculateProbability(winnerCat!.rating, loserCat!.rating);
        const loserCatProbability = calculateProbability(loserCat!.rating, winnerCat!.rating);

        const newWinnerRating = calculateNewRating(kFactor, winnerCat.rating, winnerCatProbability, 1);
        const newLoserRating = calculateNewRating(kFactor, loserCat.rating, loserCatProbability, 0);

        await prisma.cat.update({
            where: {
                id: winnerCat.id
            },
            data: {
                rating: newWinnerRating
            }
        });
        await prisma.cat.update({
            where: {
                id: loserCat.id
            },
            data : {
                rating: newLoserRating
            }
        });

        prisma.$disconnect();
        return new Response('Vote successful !')
    } catch(error) {
        console.error(error);
    }
}

function calculateProbability(playerRating: number, oponentRating: number) {
    return 1.0 / (1.0 + Math.pow(10, ((oponentRating - playerRating) / 400)))
}

function calculateNewRating(kFactor: number, playerRating: number, playerProbability: number, score: number) {
    return playerRating + kFactor * (score - playerProbability);
}