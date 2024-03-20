// pages/results.jsx

"use client"

import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router'; 
import { TypewriterEffect } from "../../app/components/ui/typewriter-effect";
import Link from 'next/link';

export default function ResultsPage() {
    const [score, setScore] = useState(null);
    const [explanation, setExplanation] = useState('');
    const router = useRouter();
    const words = [
        {
          text: "Rlty"
        },
        {
          text: "Chk"
        },
      ];

    useEffect(() => {
        // Ensure county and state are available before fetching
        if (router.isReady) {
            const { county, state } = router.query;

            // Example fetch call (adapt URL/path as necessary)
            fetch(`/api/climate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ county, state }),
            })
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    // Assuming data[0].composite_score contains the score
                    const fetchedScore = data[0].composite_score;
                    setScore(fetchedScore);
                    setExplanation(fetchedScore >= 80 ? 'Excellent Score!' : 'Needs Improvement.');
                } else {
                    // Handle no data found
                    console.log("No data found for the specified location.");
                }
            })
            .catch(error => console.error("Failed to fetch data:", error));
        }
    }, [router.isReady, router.query]);

    // Placeholder content if score hasn't been fetched yet
    if (score === null) return <div>Loading...</div>;

      return (
        <div className="flex flex-col items-center justify-start h-[40rem] mt-14">
            <p className="flex flex-col items-center text-white text-3xl mb-3" style={{ fontWeight: 550 }}>
                Results
            </p>
          <Link href="/" passHref>
              <div style={{cursor: 'pointer'}}>
                  <TypewriterEffect words={words} />
              </div>
          </Link>
        <div className="flex w-full justify-around items-center mb-5">
            <div className="text-white text-2xl" style={{ fontWeight: 300 }}>
                Score: {score}
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
