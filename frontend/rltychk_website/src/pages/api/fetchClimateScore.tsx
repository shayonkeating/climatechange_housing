//query postgres prisma ORM
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function fetchClimateScore(county: string, state: string) {
  // avoid SQL injection by treating user input as data and not a SQL command
  const result = await prisma.$queryRaw`
    SELECT state, county, composite_score
    FROM climate_score
    WHERE county = ${county} AND state = ${state}
  `;

  return result;
}