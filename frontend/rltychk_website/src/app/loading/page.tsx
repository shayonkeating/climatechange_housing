"use client"

import React from "react";
import { TypewriterEffect } from "../../app/components/ui/typewriter-effect-loading";
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";

export default function loadingPage() {
  const router = useRouter();
  const [effectKey, setEffectKey] = useState(0); // key frame effect
  const words = [
    {
      text: "Loading"
    },
    {
      text: "..."
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setEffectKey(prevKey => prevKey + 1);
    }, 1500); // adjust time of duration here
    return () => clearInterval(interval); // return the interval
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[40rem]">
      <TypewriterEffect key= {effectKey} words={words} />
      <div className="flex flex-col items-center space-y-4 mt-4"></div>
    </div>
  )
};