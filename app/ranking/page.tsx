import prisma from "@/lib/db";
import CatProfile from "./CatProfile";
import Link from "next/link";

export default async function Ranking() {
  const cats = await prisma.cat.findMany({
    orderBy: {
        rating: 'desc'
    }
  });

  return (
    <>
      <h2 className="text-2xl font-bold">Official Cat Ranking</h2>
      <div className="flex flex-grow flex-col items-center">
        <div className="flex flex-wrap justify-around">
          {cats.map((cat, i) => 
            <CatProfile key={cat.id} cat={cat} place={i + 1} />
          )}
        </div>
      </div>
      <Link role="button" href="./" className="p-2 m-1 border-4 border-gray-900 bg-gray-900 rounded-lg text-white text-sm">
        GO BACK TO VOTING
      </Link>
    </>
  );
}
