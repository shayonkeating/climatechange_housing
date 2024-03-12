"use client"

import React from 'react';
import states from '../app/data/states.json';
import { TypewriterEffect } from "../app/components/ui/typewriter-effect";
import { useRouter } from 'next/navigation'

export default function HomePage() {
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
    <><div className="flex flex-col items-center justify-center h-[40rem]">
      <p className="text-neutral-600 dark:text-neutral-200 text-xl mb-10">
        How is climate change going to affect us?
      </p>
      <TypewriterEffect words={words} />
      <div className="flex flex-col items-center space-y-4 mt-12">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <label htmlFor="countyInput" className="w-80 h-10 rounded-xl text-white text-m flex items-center justify-center">
            Enter a US county to get started:
          </label>
          <input id="countyInput" type="text" placeholder="ie San Diego..." className="w-40 h-10 rounded-xl border dark:border-white border-transparent text-black px-4" />
          <select id="dropdownMenu" className="w-35 h-10 rounded-xl border dark:border-white border-transparent bg-white text-black px-4">
            <option value="">Select a State</option>
            {states.map((state, index) => (
              <option key={index} value={state.abbreviation}>{state.name} ({state.abbreviation})</option>
            ))}
          </select>
        </div>
        <button type="button" onClick={() => router.push('/loading')}
          className="px-6 py-3 bg-blue-800 text-white rounded-xl hover:bg-blue-600 transition duration-5 linear">
          Start the Liveability Model
        </button>
      </div>
    </div><div className='absolute bottom-0 left-0 right-0 p-10'>
        <p className="flex flex-col text-white text-s" style={{ fontWeight: 200, padding: '50', textAlign: 'center' }}>
          © 2024 Made by Shayon Keating
        </p>
      </div></>
  );
}
