import { BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-library-primary text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <BookOpen className="h-6 w-6 text-library-accent" />
            <span className="text-xl font-serif font-bold">Kitabi Keeda</span>
          </div>
          <div className="text-sm text-gray-300">
            <p>Powered by Google Books API & Gemini AI</p>
            <p>© {new Date().getFullYear()} Kitabi Keeda. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
