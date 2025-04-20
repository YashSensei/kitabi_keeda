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

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

// Function to analyze prompt with Google Gemini API
export const analyzePrompt = async (prompt: string): Promise<string> => {
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
    return searchQuery;
  } catch (error) {
    console.error("Error analyzing prompt with Gemini:", error);
    toast.error("Error analyzing your prompt. Please try again.");
    throw error;
  }
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
