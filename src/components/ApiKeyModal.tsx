import { useState } from "react";
import { setGeminiApiKey } from "../services/api";

type ApiKeyModalProps = {
  onSubmit: () => void;
  onCancel: () => void;
};

const ApiKeyModal = ({ onSubmit, onCancel }: ApiKeyModalProps) => {
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      setError("Please enter a valid API key");
      return;
    }
    
    setGeminiApiKey(apiKey);
    onSubmit();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <h2 className="text-2xl font-serif font-bold mb-4 text-library-primary">
            Enter Gemini API Key
          </h2>
          
          <p className="mb-4 text-gray-600">
            Kitabi Keeda requires a Google Gemini API key to analyze your book descriptions.
            Please enter your API key below.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
                Gemini API Key
              </label>
              <input
                type="text"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-library-accent"
              />
              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
            
            <p className="text-xs text-gray-500 mb-4">
              Your API key will be stored locally in your browser. You can obtain a Gemini API key from the{" "}
              <a 
                href="https://ai.google.dev/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google AI Studio
              </a>.
            </p>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-library-accent text-white rounded-md hover:bg-library-primary"
              >
                Save API Key
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
