
import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

type SearchBoxProps = {
  className?: string;
  placeholder?: string;
};

const SearchBox = ({ className, placeholder = "Describe your perfect book..." }: SearchBoxProps) => {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      navigate(`/search?prompt=${encodeURIComponent(prompt)}`);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`relative w-full max-w-2xl ${className}`}
    >
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={placeholder}
        className="w-full px-5 py-4 pr-14 rounded-full border-2 border-library-accent/70 focus:border-library-accent focus:outline-none focus:ring-2 focus:ring-library-accent/30 shadow-md font-sans text-lg"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-library-accent text-white p-2 rounded-full hover:bg-library-primary transition-colors"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>
    </form>
  );
};

export default SearchBox;
