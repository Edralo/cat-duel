import { Prisma, Cat } from "@prisma/client";
import prisma from "@/lib/db"
import Fighter from "./Fighter";
import Link from "next/link";

export default async function Home() {
  const cats = await prisma.$queryRaw<Cat[]>(
    Prisma.sql`SELECT * FROM cat_duel."Cat" ORDER BY RANDOM() LIMIT 2`
  );

  return (
    <>
      <h2 className="text-2xl font-bold">Vote for the cutest cat</h2>
      <form className="flex flex-grow flex-col w-screen justify-around md:flex-row items-center">
        <Fighter cat={cats[0]} cats={cats}/>
        <div className="text-5xl">VS</div>
        <Fighter cat={cats[1]} cats={cats}/>
      </form>
      <Link href="/ranking" className="p-2 m-1 border-4 border-gray-900 bg-gray-900 rounded-lg text-white text-sm">
        SEE THE RANKINGS
      </Link>
    </>
  );
}
