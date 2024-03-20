// fetches the climatescore data
import type { NextApiRequest, NextApiResponse } from 'next';
import fetchClimateScore from '../../pages/api/query';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { county, state } = req.body;
    console.log(req.body);

    try {
      const scores = await fetchClimateScore(county, state);
      res.status(200).json(scores);
    } catch (error) {
      console.error("Failed to fetch climate scores:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    // Handle any non-POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}