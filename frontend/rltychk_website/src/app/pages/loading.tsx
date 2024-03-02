"use client"

import { useRouter } from 'next/navigation';

const LoadingPage = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

export default LoadingPage;
