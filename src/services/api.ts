import { SearchResult } from "../types/book";
import { toast } from "sonner";

// API key for Google Books API
const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";
const GOOGLE_BOOKS_API_KEY = "AIzaSyBvbUf-xfgG4ZpToDF5QahArFKgof-f7JE";

// This would typically be stored in a server environment variable
// For this demo, we'll use a placeholder that the user will need to provide
let GEMINI_API_KEY = "AIzaSyDjqTcJq6h_fbRix1XMXNYu75vbILb6eE4";

export const setGeminiApiKey = (key: string) => {
  GEMINI_API_KEY = key;
  localStorage.setItem("gemini_api_key", key);
};

export const getGeminiApiKey = () => {
  if (!GEMINI_API_KEY) {
    GEMINI_API_KEY = localStorage.getItem("gemini_api_key") || "";
  }
  return GEMINI_API_KEY;
};

// Function to test if the API key is valid
export const testGeminiApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "Test",
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 10,
          },
        }),
      }
    );

    return response.ok;
  } catch (error) {
    console.error("Error testing API key:", error);
    return false;
  }
};

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

// Cache for storing analyzed prompts
const promptCache = new Map<string, string>();

// Rate limiting variables
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 2000; // 2 seconds between requests

// Helper function to wait
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Function to analyze prompt with Google Gemini API
export const analyzePrompt = async (prompt: string): Promise<string> => {
  // Check cache first
  const cacheKey = prompt.toLowerCase().trim();
  if (promptCache.has(cacheKey)) {
    console.log("Using cached result for prompt:", prompt);
    return promptCache.get(cacheKey)!;
  }

  // Rate limiting: ensure minimum time between requests
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
    console.log(`Rate limiting: waiting ${waitTime}ms before next request`);
    await wait(waitTime);
  }
  lastRequestTime = Date.now();

  const apiKey = getGeminiApiKey();
  
  if (!apiKey) {
    throw new Error("Please enter your Gemini API key in settings");
  }
  
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Analyze this book search prompt and convert it into a Google Books API search query. 
                  Extract relevant keywords about genre, plot elements, characters, themes, etc.
                  Just return a search query string with these keywords joined with '+' for Google Books API. 
                  Don't include any explanation.
                  
                  Prompt: "${prompt}"`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 100,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Error analyzing prompt");
    }

    const data = await response.json() as GeminiResponse;
    const searchQuery = data.candidates[0].content.parts[0].text.trim();
    
    // Cache the result
    promptCache.set(cacheKey, searchQuery);
    console.log("Cached result for prompt:", prompt);
    
    return searchQuery;
  } catch (error) {
    console.error("Error analyzing prompt with Gemini:", error);
    
    // Check if it's a quota error and provide helpful message
    if (error instanceof Error && error.message.includes("Quota exceeded")) {
      toast.error("Rate limit exceeded. Please wait a moment before searching again.");
      throw new Error("Rate limit exceeded. Please wait a moment and try again.");
    }
    
    toast.error("Error analyzing your prompt. Please try again.");
    throw error;
  }
};

// Fallback function to create a simple search query from the prompt
export const createFallbackSearchQuery = (prompt: string): string => {
  // Simple keyword extraction for when Gemini API is unavailable
  const keywords = prompt
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .split(/\s+/)
    .filter(word => 
      word.length > 2 && 
      !['the', 'and', 'but', 'for', 'are', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use'].includes(word)
    )
    .slice(0, 5); // Take first 5 relevant keywords
  
  return keywords.join('+');
};

// Function to search books from Google Books API
export const searchBooks = async (query: string): Promise<SearchResult> => {
  try {
    const response = await fetch(`${GOOGLE_BOOKS_API_URL}?q=${query}&maxResults=20&key=${GOOGLE_BOOKS_API_KEY}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    toast.error("Error fetching books. Please try again.");
    throw error;
  }
};

// Function to get a single book by ID
export const getBookById = async (bookId: string) => {
  try {
    const response = await fetch(`${GOOGLE_BOOKS_API_URL}/${bookId}?key=${GOOGLE_BOOKS_API_KEY}`);
    
    if (!response.ok) {
      throw new Error("Book not found");
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching book details:", error);
    toast.error("Error fetching book details. Please try again.");
    throw error;
  }
};
