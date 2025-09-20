
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { analyzePrompt, searchBooks, createFallbackSearchQuery } from "../services/api";
import { BookType, SearchResult } from "../types/book";
import BookCard from "../components/BookCard";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchBox from "../components/SearchBox";
import ApiKeyModal from "../components/ApiKeyModal";
import { getGeminiApiKey } from "../services/api";
import { toast } from "sonner";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const prompt = searchParams.get("prompt") || "";
  
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  useEffect(() => {
    if (!prompt) return;

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Check if Gemini API key is available
        if (!getGeminiApiKey()) {
          setShowApiKeyModal(true);
          return;
        }
        
        // Step 1: Analyze the prompt with Gemini API
        toast.info("Analyzing your book description...");
        let query: string;
        
        try {
          query = await analyzePrompt(prompt);
        } catch (error) {
          // If Gemini API fails (rate limit or other), use fallback
          if (error instanceof Error && error.message.includes("Rate limit exceeded")) {
            toast.info("Using simplified search due to rate limits...");
            query = createFallbackSearchQuery(prompt);
          } else {
            throw error; // Re-throw other errors
          }
        }
        
        setSearchQuery(query);
        
        // Step 2: Search for books using the generated query
        toast.info("Searching for your perfect books...");
        const results: SearchResult = await searchBooks(query);
        
        if (results.totalItems === 0) {
          setError("No books found matching your description. Try a different prompt.");
          setBooks([]);
        } else {
          setBooks(results.items || []);
          toast.success(`Found ${results.items.length} books that match your description!`);
        }
      } catch (err) {
        console.error("Error in search flow:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [prompt]);

  const handleApiKeySubmit = () => {
    setShowApiKeyModal(false);
    // Re-trigger the search once the API key is set
    window.location.reload();
  };

  return (
    <div className="search-bg">
      <div className="page-container">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold mb-4 text-library-primary">Book Search Results</h1>
          <SearchBox className="max-w-xl" />
          {searchQuery && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Your prompt:</span> {prompt}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Search query:</span> {searchQuery.replace(/\+/g, ' ')}
              </p>
            </div>
          )}
        </div>
        {loading ? (
          <LoadingSpinner message="Finding your perfect books..." />
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : (
          <>
            {books.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No books found. Try a different search.</p>
              </div>
            )}
          </>
        )}
        {showApiKeyModal && (
          <ApiKeyModal onSubmit={handleApiKeySubmit} onCancel={() => window.location.href = "/"} />
        )}
      </div>
    </div>
  );
};

export default SearchResults;
