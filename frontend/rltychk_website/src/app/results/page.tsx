// pages/results.jsx
"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TypewriterEffect } from "../../app/components/ui/typewriter-effect";
import Link from 'next/link';

// Updated interface based on your JSON structure
interface ClimateScore {
    state: string;
    county: string;
    composite_score: string;
    heater_z_slope: string;
    cooler_z_slope: string;
    precip_z_slope: string;
    temp_a_z_slope: string;
    temp_max_z_slope: string;
    temp_min_z_slope: string;
  }
  
  interface ClimateData {
    climateScores: ClimateScore[];
  }
  
  export default function ResultsPage() {
      const [data, setData] = useState<ClimateData | null>(null);
  
      useEffect(() => {
        const storedData = sessionStorage.getItem('climateData');
        if (storedData) {
          setData(JSON.parse(storedData));
        }
      }, []);
  
      if (!data || data.climateScores.length === 0) return <div>Loading...</div>; // Adjusted to check for empty array
  
      const firstScore = data.climateScores[0]; // Assuming you want to display the first result
      const explanation = parseFloat(firstScore.composite_score) >= 80 ? 'Excellent Score!' : 'Needs Improvement.';
  
      return (
          <div className="flex flex-col items-center justify-start h-[40rem] mt-14">
              <p className="flex flex-col items-center text-white text-3xl mb-3" style={{ fontWeight: 550 }}>
                  Results
              </p>
              <Link href="/" passHref>
                  <div style={{cursor: 'pointer'}}>
                      <TypewriterEffect words={[
                          { text: "Rlty" },
                          { text: "Chk" },
                      ]} />
                  </div>
              </Link>
              <div className="flex w-full justify-around items-center mb-5">
                  <div className="text-white text-2xl" style={{ fontWeight: 300 }}>
                      Score: {firstScore.composite_score} // Displaying the composite score
                  </div>
                  <div className="text-white" style={{ fontWeight: 200 }}>
                      {explanation}
                  </div>
              </div>
              <Link href="/about" passHref>
                  <div style={{cursor: 'pointer'}}>
                      <a className="text-white underline">Learn more about the scoring</a>
                  </div>
              </Link>
          
              <p className="flex flex-col text-white text-s" style={{ fontWeight: 200, padding: '50', textAlign: 'center'}}>
                  © 2024 Made by Shayon Keating
              </p>
          </div>
      );
  }

