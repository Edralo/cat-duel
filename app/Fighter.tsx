'use client';

import { Cat } from "@prisma/client";
import Image from "next/image";

type FighterProps = {
    cat: Cat
}

const imgStyle = {
    borderRadius: '50%'
}

export default function Fighter({cat}: FighterProps) {
    return (
        <div className="size-60 md:size-80 lg:size-96 xl:size-auto object-fill">
            <Image
                src={cat.imgUrl}
                width={500}
                height={500}
                alt="Picture of a cute cat"
                style={imgStyle}
            />  
        </div>
    )
}