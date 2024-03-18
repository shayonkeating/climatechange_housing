import { useRouter } from 'next/navigation'

const ErrorPage = () => {
  const router = useRouter();
  return (
    <div>
      <h1>Error</h1>
    </div>
  );
};

export default ErrorPage;