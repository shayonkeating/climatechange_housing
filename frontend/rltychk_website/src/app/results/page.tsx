// pages/results.jsx
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Extract county and state from the request body
    const { county, state } = req.body;

    try {
      // Query the database for climate scores matching the provided county and state
      const climateScores = await prisma.climateScore.findMany({
        where: {
          AND: [
            { County: { equals: county, mode: 'insensitive' } },
            { State: { equals: state, mode: 'insensitive' } },
          ],
        },
      });

      // Respond with the fetched data
      res.status(200).json(climateScores);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    // If the request method is not POST, return a 405 Method Not Allowed
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

