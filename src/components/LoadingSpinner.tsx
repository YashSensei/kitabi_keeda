
import { BookOpen } from 'lucide-react';

type LoadingSpinnerProps = {
  message?: string;
};

const LoadingSpinner = ({ message = "Loading books..." }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="relative">
        <BookOpen className="h-12 w-12 text-library-accent animate-pulse" />
        <div className="absolute inset-0 border-t-2 border-library-primary rounded-full animate-spin opacity-20"></div>
      </div>
      <p className="mt-4 text-library-primary font-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
