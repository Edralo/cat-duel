const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

async function main() {
    try {
        const fetchCats = await fetch("https://data.latelier.co/cats.json");
        if (!fetchCats.ok) {
            throw new Error(`HTTP Error while fetching cat data : ${fetchCats.status}`);
        }
        const catsJson = await fetchCats.json();
        await Promise.allSettled(
            catsJson.images.map(cat => {
                return prisma.cat.upsert({
                    where: {
                        id: cat.id
                    },
                    create: {
                        id: cat.id,
                        imgUrl: cat.url
                    },
                    update: {}
                })
            })
        ).catch(error => console.error(`Failed while seeding DB : ${error}`));
        console.log("Cats are created !")
    } catch(error) {
        console.error(error)
    } finally {
        await prisma.$disconnect();
    }
}

main();