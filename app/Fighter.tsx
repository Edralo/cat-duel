'use client';

import { Cat } from "@prisma/client";
import Image from "next/image";

type FighterProps = {
    cat: Cat,
    handleVote: (cat: Cat) => void
}

export default function Fighter({cat, handleVote}: FighterProps) {
    return (
        <Image
            src={cat.imgUrl}
            width={500}
            height={500}
            alt="Picture of a cute cat"
            className="size-60 md:size-80 lg:size-[30rem] rounded-full object-fill border-black border-8 hover:cursor-pointer"
            onClick={() => handleVote(cat)}
        />
    )
}