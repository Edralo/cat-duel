"use server";

import { revalidatePath } from "next/cache";
import { Cat } from "@prisma/client";
import prisma from "../lib/db";

export async function handleVote(votedCat: Cat, cats: Cat[]) {
    const kFactor = 30;
    const winnerID = votedCat.id;
    const loserID = cats?.filter((cat) => cat.id !== winnerID)[0].id;

    const winnerCat = await prisma.cat.findUnique({
        where: {
            id: winnerID
        }
    })
    const loserCat = await prisma.cat.findUnique({
        where: {
            id: loserID
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

    revalidatePath('/');
}

function calculateProbability(playerRating: number, oponentRating: number) {
    return 1.0 / (1.0 + Math.pow(10, ((oponentRating - playerRating) / 400)));
}

function calculateNewRating(kFactor: number, playerRating: number, playerProbability: number, score: number) {
    return playerRating + kFactor * (score - playerProbability);
}