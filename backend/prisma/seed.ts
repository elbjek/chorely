import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create sample users
  const user1 = await prisma.user.create({
    data: { name: "User 3", email: "user3@example.com" },
  });

  const user2 = await prisma.user.create({
    data: { name: "User 4", email: "user4@example.com" },
  });

  // Create sample households
  const household1 = await prisma.household.create({
    data: { name: "Household 3" },
  });

  const household2 = await prisma.household.create({
    data: { name: "Household 4" },
  });

  // Assign users to households
  await prisma.user.update({
    where: { id: user1.id },
    data: { householdId: household1.id },
  });

  await prisma.user.update({
    where: { id: user2.id },
    data: { householdId: household2.id },
  });

  // Create sample chores
  const chore1 = await prisma.chore.create({
    data: { name: "Chore 1", frequency: 7, userId: user1.id, point: 10 },
  });

  const chore2 = await prisma.chore.create({
    data: { name: "Chore 2", frequency: 3, userId: user2.id, point: 5 },
  });

  // Create sample household chores (pivot table entries)
  await prisma.householdChore.create({
    data: {
      householdId: household1.id,
      choreId: chore1.id,
    },
  });

  await prisma.householdChore.create({
    data: {
      householdId: household1.id,
      choreId: chore2.id,
    },
  });

  await prisma.householdChore.create({
    data: {
      householdId: household2.id,
      choreId: chore1.id,
    },
  });

  // Create sample points
  await prisma.point.create({
    data: { points: 100, userId: user1.id },
  });

  await prisma.point.create({
    data: { points: 50, userId: user2.id },
  });

  console.log("Database has been seeded. 🌱");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
