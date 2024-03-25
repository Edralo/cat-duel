'use client';

import useSWRImmutable from "swr/immutable";
import { Cat } from "@prisma/client";
import Fighter from "./Fighter";
import Link from "next/link";

type fetchDuelData = {
  cats: Array<Cat>;
}

export default function Home() {

  async function getDuel(url: string) {
    const duelData = await fetch(url);
  
    if (!duelData.ok)
      throw new Error("Failed fetching search data");
  
    const json: fetchDuelData = await duelData.json();
  
    return json.cats;
  }

  async function handleVote(winnerCat: Cat) {
    const winnerID = winnerCat.id;
    const loserID = data?.filter((cat) => cat.id !== winnerID)[0].id;

    const sendVote = await fetch('/api/duel', {
      method:'POST',
      body: JSON.stringify({
        winner : winnerID,
        loser : loserID
      })
    });

    if (!sendVote.ok)
      throw new Error("Failed sending vote data");

    return window.location.reload();
  }

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
    <>
      <h2 className="text-2xl font-bold">Vote for the cutest cat</h2>
      <div className="flex flex-grow flex-col md:flex-row w-screen content-around md:justify-around items-center">
        <Fighter cat={data[0]} handleVote={handleVote}/>
        <div className="text-5xl">VS</div>
        <Fighter cat={data[1]} handleVote={handleVote}/>
      </div>
      <Link href="/ranking" className="py-1">
        <button>See the rankings</button>
      </Link>
    </>
  );
}
