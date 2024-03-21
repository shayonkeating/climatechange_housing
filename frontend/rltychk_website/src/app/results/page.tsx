// pages/results.jsx
"use client"
import React, { useState, useEffect } from 'react';
import { TypewriterEffect } from "../../app/components/ui/typewriter-effect";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
    const router = useRouter();
    const handleClick = () => {
        router.push('/about');
    }
      const [data, setData] = useState<ClimateData | null>(null);
  
      useEffect(() => {
        const storedData = sessionStorage.getItem('climateData');
        console.log("Retrieved Data:", storedData); // console log for debugging 
        if (storedData) {
          setData(JSON.parse(storedData));
        }
      }, []);
  
      if (!data || data.climateScores.length === 0) {
        return (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            textAlign: 'center',
            color: 'white',
            width: '100%',
            fontSize: '24px',
            gap: '20px'
            }}>
            Whoopsies climate cowboy 🤠! <br />
            Looks like you spelled something wrong <br />
            or it doesn&apos;t exist.
            <Link href="/" passHref>
                <div style={{cursor: 'pointer'}}>
                    <a className="text-white underline text-2xl">👋 Let&apos;s take you back home...</a>
                </div>
            </Link>
        </div>
    );
  }

      const firstScore = data.climateScores[0];
      const scoreValue = parseFloat(firstScore.composite_score);
      const countyView = parseFloat(firstScore.county);
      const stateView = parseFloat(firstScore.state);

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
            This area will be definitely be impacted by climate change. Analyze this result in context!
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
      } else if (scoreValue >= 20) {
        explanation = (
            <>
            Solid choice ✌️! These places are good living spots in the continental US and a great place to settle down.
            Climate change will still affect here to some extent especially if you are by the ocean 🌊 or in the great plains. Rising sea levels
            and intense storms are way scary! ⛈️
            </>
        );
      } else {
        explanation = (
            <>
            Homie, did you just find the best place to live? These places exist in the high desert and mountains 
            (usually) 🏞️. If you can make it here and find a sweet spot to live, consider the climate to treat you right.
            Just try not to live near the ocean, this model does not consider sea level rise or storms and that could mess you up! ⛈️
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
                    <div className="text-white text-4xl" style={{ fontWeight: 500, textAlign: 'center', marginBottom: '20px'}}>
                        {firstScore.county}, {firstScore.state}
                    </div>
                    <div className="text-white text-6xl" style={{ fontWeight: 500, textAlign: 'center' }}>
                        {firstScore.composite_score}
                    </div>
                </div>
                <div className="explanation text-white text-xl" style={{ fontWeight: 300, maxWidth: '600px', margin: '0 auto', marginBottom: '30px'}}>
                    {explanation}
                </div>
                <div className="flex justify-center items-center mt-4">
                    <button type="button" onClick={handleClick}
                    className="px-6 py-3 bg-blue-800 text-white rounded-xl hover:bg-blue-600 transition duration-5 ease-in-out flex items-center justify-center cursor-pointer">
                        👋 Learn more about the scoring
                    </button>
                </div>
              <p className="flex flex-col text-white text-s" style={{ fontWeight: 200, padding: '50', textAlign: 'center', paddingTop: '50px'}}>
                  © 2024 Made by Shayon Keating
              </p>
          </div>
      );
  }

