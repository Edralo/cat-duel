'use client'

import useSWRImmutable from "swr/immutable";
import { Cat } from "@prisma/client";
import CatProfile from "./CatProfile";
import Link from "next/link";
import { Button } from "@material-tailwind/react";

type fetchAllCatsData = {
  cats: Array<Cat>;
}

export default function Ranking() {

  async function getAllCats(url: string) {
    const duelData = await fetch(url);
  
    if (!duelData.ok)
      throw new Error("Failed fetching search data");
  
    const json: fetchAllCatsData = await duelData.json();
  
    return json.cats;
  }

  const { data, isLoading } = useSWRImmutable(
    '/api/ranking',
    (url) => getAllCats(url),
  );

  if (!data || isLoading) {
    return (
      <div>
        Waiting for the cats
      </div>
    )
  }

  return (
    <>
      <h2 className="text-2xl font-bold">Official Cat Ranking</h2>
      <div className="flex flex-grow flex-col items-center">
        <div className="flex flex-wrap justify-around">
          {data.map((cat, i) => 
            <CatProfile key={cat.id} cat={cat} place={i + 1} />
          )}
        </div>
      </div>
      <Link href="./">
        <Button>Go back to voting</Button>
      </Link>
    </>
  );
}
