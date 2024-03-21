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
        console.log("Retrieved Data:", storedData); // console log for debugging 
        if (storedData) {
          setData(JSON.parse(storedData));
        }
      }, []);
  
      if (!data || data.climateScores.length === 0) return <div>Loading...</div>;

      const firstScore = data.climateScores[0];
      const scoreValue = parseFloat(firstScore.composite_score);

      let explanation;
      if (scoreValue >= 80) {
        explanation = (
            <>
            Ouch ❤️‍🩹! This place will be GREATLY impacted by climate change in the future. 
            A high score value means that the climate is not stable and will change in the future.
            However, analyze this result in context! This is seen as massive heat waves and changes in precipitation.
            🙅‍♂️
            </>
        );
      } else if (scoreValue >= 60) {
        explanation = (
            <>
            This area will be impacted by climate change to an extent. Analyze this result in context!
            Places with this score fall further north so that could mean less snow ☃️ and warmer summers. 😎
            The ski industry will not like this. ⛷️
            </>
        );
      } else if (scoreValue >= 40) {
        explanation = (
            <>
            Not great but also not bad. Climate change will affect here but its not a bad place to call home.🏡
            Climate change is affecting us worldwide so this area (in context) might not be a bad place to settle down.
            Just be careful of future storms and sea level rising! ⛈️
            </>
        );
      } else {
        explanation = (
            <>
            Homie, did you just find the best place to live? These places exist in the high desert and mountains 
            (usually) 🏞️. If you can make it here and find a sweet spot to live, consider the climate to treat you right.
            Just try not to live near the ocean, this model does not consider sea level rise or storms! ⛈️
            </>
        );
      }

      return (
          <div className="flex flex-col items-center justify-start h-[40rem] mt-14">
              <p className="flex flex-col items-center text-white text-3xl mb-3" style={{ fontWeight: 550 }}>
                  Results
              </p>
              <Link href="/" passHref>
                  <div style={{cursor: 'pointer', paddingBottom: '75px'}}>
                      <TypewriterEffect words={[
                          { text: "Rlty" },
                          { text: "Chk" },
                      ]} />
                  </div>
              </Link>
              <div className="score-container mb-10">
                    <div className="text-white text-5xl" style={{ fontWeight: 500, textAlign: 'center', marginBottom: '10px'}}>
                        Score
                    </div>
                    <div className="text-white text-5xl" style={{ fontWeight: 500, textAlign: 'center' }}>
                        {firstScore.composite_score}
                    </div>
                </div>
                <div className="explanation text-white text-xl" style={{ fontWeight: 300, maxWidth: '600px', margin: '0 auto', marginBottom: '30px'}}>
                    {explanation}
                </div>
              <Link href="/about" passHref>
                  <div style={{cursor: 'pointer', marginBottom: '100px'}}>
                      <a className="text-white underline text-xl">👋 Learn more about the scoring</a>
                  </div>
              </Link>
              <p className="flex flex-col text-white text-s" style={{ fontWeight: 200, padding: '50', textAlign: 'center'}}>
                  © 2024 Made by Shayon Keating
              </p>
          </div>
      );
  }

