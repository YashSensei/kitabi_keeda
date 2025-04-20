import { BookOpen } from "lucide-react";
import SearchBox from "../components/SearchBox";
import RecommendedBooks from "../components/RecommendedBooks";

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col bg-library-primary py-20 px-4">
      <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
        <div className="flex justify-center mb-6">
          <BookOpen className="h-16 w-16 text-library-accent animate-page-turn" />
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 text-library-text bg-gradient-to-r from-library-accent to-library-highlight bg-clip-text text-transparent">
          Kitabi Keeda
        </h1>
        
        <p className="text-lg md:text-xl text-library-light mb-10 px-4">
          Describe your perfect book and let AI magic find your next favorite read
        </p>
        
        <SearchBox className="mx-auto mb-12" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-4">
          <div className="bg-library-secondary p-6 rounded-lg shadow-md border border-library-accent/10">
            <h3 className="text-lg font-serif font-medium mb-2 text-library-accent">Describe</h3>
            <p className="text-library-light">Tell us about the book you're looking for in natural language</p>
          </div>
          
          <div className="bg-library-secondary p-6 rounded-lg shadow-md border border-library-accent/10">
            <h3 className="text-lg font-serif font-medium mb-2 text-library-highlight">Discover</h3>
            <p className="text-library-light">Our AI analyzes your description to find perfect matches</p>
          </div>
          
          <div className="bg-library-secondary p-6 rounded-lg shadow-md border border-library-accent/10">
            <h3 className="text-lg font-serif font-medium mb-2 text-library-accent">Delight</h3>
            <p className="text-library-light">Explore detailed book information and start reading</p>
          </div>
        </div>
      </div>

      <RecommendedBooks />

      <div className="mt-12 text-sm text-library-light text-center">
        <p>Powered by Google Books API and Google Gemini AI</p>
      </div>
    </div>
  );
};

export default Index;
