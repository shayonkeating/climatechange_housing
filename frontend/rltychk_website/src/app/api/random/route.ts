// runs a random sql query and just finds something randomly
"use server"
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET() {
  // sql logic here to find the data needed
  try {
    const result = await sql`
    SELECT * FROM climate_score ORDER BY RANDOM() LIMIT 1;
    `;
    const climateScores = result.rows;
    return NextResponse.json({ climateScores }, { status: 200 }); //200 response okay
  } catch (error) {
    console.error('Error executing query:', error);
    return NextResponse.json({ error: 'An error occurred 500' }, { status: 500 }); // 500 error cant fulfull
  }
}