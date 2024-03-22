// fetches the climate score data through post get to api to vercel postgres
"use server"
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let county = searchParams.get('county');
  let state = searchParams.get('state');
 
  if (!county || !state) {
    return NextResponse.json({ error: 'County and state parameters are required' }, { status: 400 }); // 400 error req
  }

  county = county.trim();
  state = state.trim();

  // sql logic here to find the data needed
  try {
    const result = await sql`
    SELECT * FROM climate_score
    WHERE LOWER(county) = LOWER(${county}) AND LOWER(state) = LOWER(${state});
    
    `;
    const climateScores = result.rows;
    return NextResponse.json({ climateScores }, { status: 200 }); //200 response okay
  } catch (error) {
    console.error('Error executing query:', error);
    return NextResponse.json({ error: 'An error occurred 500' }, { status: 500 }); // 500 error cant fulfull
  }
}