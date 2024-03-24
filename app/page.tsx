'use client';

import useSWRImmutable from "swr/immutable";
import Fighter from "./Fighter";
import { Cat } from "@prisma/client";

type SearchResultData = {
  cats: Array<Cat>;
}

async function getDuel(url: string) {
  const duelData = await fetch(url);

  if (!duelData.ok)
    throw new Error("Failed fetching search data");

  const json: SearchResultData = await duelData.json();

  return json.cats;
}

export default function Home() {
  const { data, isLoading } = useSWRImmutable(
    '/api/duel',
    (url) => getDuel(url),
  );

  if (!data || isLoading) {
    return (
      <div>
        Waiting for the cats
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row w-screen content-around md:justify-around items-center">
      <Fighter cat={data[0]} />
      <div className="text-5xl">VS</div>
      <Fighter cat={data[1]} />
    </div>
  );
}
