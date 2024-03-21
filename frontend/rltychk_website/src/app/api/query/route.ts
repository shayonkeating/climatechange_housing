// fetches the climatescore data
"use server"
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  // Assuming that we are using query parameters for county and state
  const { searchParams } = new URL(request.url);
  const county = searchParams.get('county');
  const state = searchParams.get('state');
 
  if (!county || !state) {
    // If the required query parameters are not provided, return a 400 Bad Request response
    return NextResponse.json({ error: 'County and state parameters are required' }, { status: 400 });
  }

  try {
    // Now we run a SELECT query on the climate_score table with the provided query parameters
    const result = await sql`
      SELECT * FROM climate_score
      WHERE county = ${county} AND state = ${state};
    `;
    const climateScores = result.rows;
    return NextResponse.json({ climateScores }, { status: 200 });
  } catch (error) {
    // If there's an error during the query, return a 500 Internal Server Error response
    console.error('Error executing query:', error);
    return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 });
  }
}
