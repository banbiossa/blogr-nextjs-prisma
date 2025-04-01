// scripts/reset.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function reset() {
  console.log('🧹 Clearing database…');


  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Database cleared.');
  await prisma.$disconnect();
}

reset().catch((e) => {
  console.error(e);
  process.exit(1);
});
