import { Cat } from "@prisma/client";
import Image from "next/image";

type CatProfileProps = {
    cat: Cat,
    place: number
}

export default function CatProfile({cat, place}: CatProfileProps) {
    return (
        <div className="p-2 flex flex-col items-center">
            <p className="font-bold">{place}</p>
            <Image
                src={cat.imgUrl}
                width={50}
                height={50}
                alt="Picture of a cute cat"
                className="size-28 rounded-full object-fill border-black border-8"
            />
        </div>
    )
}