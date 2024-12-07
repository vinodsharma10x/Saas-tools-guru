import { PrismaClient } from '@prisma/client';
import { TOOLS } from '../src/data/tools';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.tool.deleteMany();

  // Seed tools
  for (const tool of TOOLS) {
    await prisma.tool.create({
      data: {
        ...tool,
        features: JSON.stringify(tool.features),
        screenshots: JSON.stringify(tool.screenshots),
        pros: JSON.stringify(tool.pros),
        cons: JSON.stringify(tool.cons),
        bestFor: JSON.stringify(tool.bestFor),
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });