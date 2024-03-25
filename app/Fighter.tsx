'use client';

import { Cat } from "@prisma/client";
import Image from "next/image";
import { handleVote } from "./actions";

type FighterProps = {
    cat: Cat,
    cats: Cat[]
}

export default function Fighter({cat, cats}: FighterProps) {
    return (
        <Image
            src={cat.imgUrl}
            width={500}
            height={500}
            alt="Picture of a cute cat"
            className="size-60 md:size-80 lg:size-[30rem] object-contain border-black border-8 bg-black"
            onClick={() => handleVote(cat, cats)}
        />
    )
}