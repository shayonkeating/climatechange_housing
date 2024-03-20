// pages/results.jsx

"use client"

import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router'; 
import { TypewriterEffect } from "../../app/components/ui/typewriter-effect";
import Link from 'next/link';

export default function ResultsPage() {
    const [data, setData] = useState(null);
  
    useEffect(() => {
      const storedData = sessionStorage.getItem('climateData');
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    }, []);
  
    if (!data) return <div>Loading...</div>;
    const router = useRouter();
    const words = [
        {
          text: "Rlty"
        },
        {
          text: "Chk"
        },
      ];

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
                Score: {data.composite_score}
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
