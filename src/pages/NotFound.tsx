
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { BookOpen } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-library-light px-4">
      <div className="text-center max-w-md">
        <BookOpen className="h-16 w-16 text-library-accent mx-auto mb-6" />
        
        <h1 className="text-4xl font-serif font-bold mb-4 text-library-primary">
          Page Not Found
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          The book you're looking for seems to be missing from our shelves.
        </p>
        
        <Link 
          to="/" 
          className="bg-library-accent hover:bg-library-primary text-white font-medium py-2 px-6 rounded-full inline-block transition-colors"
        >
          Return to Library
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
