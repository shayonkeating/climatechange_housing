"use client"

import React from "react";
import { TypewriterEffect } from "../../app/components/ui/typewriter-effect";
import { useRouter } from 'next/navigation'

export default function loading_page() {
  const router = useRouter();
  const words = [
    {
      text: "Loading"
    },
    {
      text: "..."
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-[40rem]">
      <TypewriterEffect words={words} />
      <div className="flex flex-col items-center space-y-4 mt-4"></div>
    </div>
  )
};