"use client"

import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]">
      <p className="text-neutral-600 dark:text-neutral-200 text-xl mb-10">
        Loading...
        Doing the Climate Model...
        One Sec...
      </p>
    </div>
  );
}

