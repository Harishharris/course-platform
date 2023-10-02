const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Music" },
        { name: "Engineering" },
        { name: "Psychology" },
        { name: "Maths" },
        { name: "Stoicism" },
      ],
    });
    console.log("SUCCESS");
  } catch (err) {
    console.log("Error seeding the database", err);
  } finally {
    database.$disconnect();
  }
}

main();
