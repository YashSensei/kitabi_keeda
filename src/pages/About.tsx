import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="page-container">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-6">
          <BookOpen className="h-12 w-12 text-library-accent" />
        </div>
        
        <h1 className="text-3xl font-serif font-bold mb-6 text-center text-library-primary">
          About Kitabi Keeda
        </h1>
        
        <div className="prose prose-slate max-w-none">
          <p>
            Kitabi Keeda is a unique online book discovery platform that leverages the power of AI to help you find your next favorite read. 
            Unlike traditional book catalogs that rely on rigid categories or keyword searches, 
            our platform allows you to describe the kind of book you're looking for in natural language.
          </p>
          
          <h2>How It Works</h2>
          
          <p>
            When you enter a prompt describing your ideal book, our system uses Google's Gemini AI to analyze your description and 
            extract the key elements you're looking for, such as genre, themes, character types, settings, and more. 
            Then, it queries the Google Books API to find titles that best match your description.
          </p>
          
          <p>
            This approach allows for much more nuanced book discovery than traditional search methods. 
            For example, you could ask for "a science fiction novel with strong female characters and themes of environmental conservation," 
            or "a mystery set in Victorian London with supernatural elements," and our system will work to find books that match these specific criteria.
          </p>
          
          <h2>Our Technology</h2>
          
          <p>
            Kitabi Keeda is powered by two key technologies:
          </p>
          
          <ul>
            <li><strong>Google Gemini AI:</strong> Analyzes your natural language prompts to understand what you're looking for.</li>
            <li><strong>Google Books API:</strong> Provides access to a vast database of books to match your preferences.</li>
          </ul>
          
          <h2>Getting Started</h2>
          
          <p>
            To get started, simply enter a description of the type of book you're looking for in the search box on our home page. 
            Be as specific or as general as you like—the more detail you provide, the more tailored our recommendations will be.
          </p>
          
          <div className="mt-6 text-center">
            <Link 
              to="/"
              className="bg-library-accent hover:bg-library-primary text-white font-medium py-2 px-6 rounded-full inline-block transition-colors"
            >
              Start Discovering Books
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
