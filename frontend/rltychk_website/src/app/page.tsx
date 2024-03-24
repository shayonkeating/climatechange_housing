// home page

"use client"

import React, {useState} from 'react';
import states from '../app/data/states.json';
import { TypewriterEffect } from "../app/components/ui/typewriter-effect";
import { useRouter } from 'next/navigation'


export default function HomePage() {
  const router = useRouter();
  const words = [{text: "Rlty"}, {text: "Chk"},]; // words for typewriter effect
  const [state, setState] = useState(''); // handle the state for user input of state
  const [county, setCounty] = useState(''); // handle the state for user input of county
  const delay = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));
  const randSubmit = async () => {
    console.log("randSubmit called");
    try {
      sessionStorage.clear();
      const url = `/api/random`;
  
      // Navigate to loading page
      await router.push('/loading');
      await delay(650)
  
      // send the user input to the API
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // storing and navigating
        sessionStorage.setItem('climateData', JSON.stringify(data));
        await router.push('/results');
      } else {
        console.error("Error fetching data:", data.error);
        await router.push('/error');
      }
    } catch (error) {
      console.error("Navigation or Fetch error:", error);
    }
  };
  const handleSubmit = async () => {
    console.log("handleSubmit called");
    try {
      const query = new URLSearchParams({ county, state }).toString();
      const url = `/api/query?${query}`;
  
      // Navigate to loading page
      await router.push('/loading');
      await delay(650)
  
      // send the user input to the API
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // storing and navigating
        sessionStorage.setItem('climateData', JSON.stringify(data));
        await router.push('/results');
      } else {
        console.error("Error fetching data:", data.error);
        await router.push('/error');
      }
    } catch (error) {
      console.error("Navigation or Fetch error:", error);
    }
  };
  
  return (
    <><div className="flex flex-col items-center justify-center h-[40rem]">
      <p className="flex flex-col text-center items-center text-white text-xl mb-10">
        How is climate change going to affect us?
      </p>
      <TypewriterEffect words={words} />
      <div className="flex flex-col items-center space-y-4 mt-12">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <label htmlFor="countyInput" className="w-75 h-10 rounded-xl text-white text-m flex items-center justify-center">
            Enter a US county to get started:
          </label>
          <input id="countyInput" type="text" placeholder="ie San Diego..." value={county} onChange={(e) => setCounty(e.target.value)} className="flex flex-row w-40 h-10 rounded-xl border dark:border-white border-transparent text-black px-4" />
          <select id="dropdownMenu" value={state} onChange={(e) => setState(e.target.value)}  className="w-35 h-10 rounded-xl border dark:border-white border-transparent bg-white text-black px-4">
            <option value="">Select a State</option>
            {states.map((state, index) => (
              <option key={index} value={state.name}>{state.name}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <button type="button" onClick={handleSubmit} 
            className="px-4 py-3 bg-blue-800 text-white rounded-xl hover:bg-blue-600 transition duration-500 ease-linear">
            Start the Liveability Model
          </button>
          <button type="button" onClick={randSubmit} 
            className="px-4 py-3 bg-blue-800 text-white rounded-xl hover:bg-blue-600 transition duration-500 ease-linear">
            Surprise Me
          </button>
        </div>
      </div>
    </div><div className='absolute bottom-0 left-0 right-0 p-10'>
        <p className="flex flex-col text-white text-s" style={{ fontWeight: 200, padding: '50', textAlign: 'center' }}>
          © 2024 Made by Shayon Keating
        </p>
      </div></>
  );
}
