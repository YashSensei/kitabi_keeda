import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBookById } from "../services/api";
import { BookType } from "../types/book";
import LoadingSpinner from "../components/LoadingSpinner";
import { Book, ChevronLeft, Calendar, User, Building, FileText } from "lucide-react";
import { toast } from "sonner";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchBookDetails = async () => {
      setLoading(true);
      
      try {
        const bookData = await getBookById(id);
        setBook(bookData);
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError(err instanceof Error ? err.message : "Failed to load book details");
        toast.error("Could not load book details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <LoadingSpinner message="Loading book details..." />;
  }

  if (error || !book) {
    return (
      <div className="page-container">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error || "Book not found"}
        </div>
        <div className="mt-4">
          <Link to="/" className="text-library-primary hover:text-library-accent">
            ← Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const { volumeInfo } = book;

  return (
    <div className="page-container">
      <div className="mb-6">
        <Link 
          to="javascript:history.back()" 
          className="inline-flex items-center text-library-primary hover:text-library-accent"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to results
        </Link>
      </div>

      <div className="book-detail-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="sticky top-8">
              {volumeInfo.imageLinks?.thumbnail ? (
                <img
                  src={volumeInfo.imageLinks.thumbnail.replace('http:', 'https:')}
                  alt={volumeInfo.title}
                  className="w-full max-w-xs mx-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                />
              ) : (
                <div className="w-full aspect-[2/3] bg-library-secondary rounded-lg flex items-center justify-center">
                  <Book className="h-24 w-24 text-library-primary opacity-40" />
                </div>
              )}

              {volumeInfo.previewLink && (
                <div className="mt-6 text-center">
                  <a
                    href={volumeInfo.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-library-accent hover:bg-library-primary text-white font-medium py-2 px-6 rounded-full inline-block transition-colors"
                  >
                    Preview Book
                  </a>
                </div>
              )}

              <div className="mt-6 bg-library-secondary rounded-lg p-4">
                <h3 className="font-serif font-medium text-lg mb-3 text-library-primary">Book Information</h3>
                
                <div className="space-y-3">
                  {volumeInfo.publishedDate && (
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-library-accent mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Published</p>
                        <p className="text-sm">{volumeInfo.publishedDate}</p>
                      </div>
                    </div>
                  )}

                  {volumeInfo.publisher && (
                    <div className="flex items-start">
                      <Building className="h-5 w-5 text-library-accent mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Publisher</p>
                        <p className="text-sm">{volumeInfo.publisher}</p>
                      </div>
                    </div>
                  )}

                  {volumeInfo.pageCount && (
                    <div className="flex items-start">
                      <FileText className="h-5 w-5 text-library-accent mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Pages</p>
                        <p className="text-sm">{volumeInfo.pageCount}</p>
                      </div>
                    </div>
                  )}

                  {volumeInfo.language && (
                    <div className="flex items-start">
                      <User className="h-5 w-5 text-library-accent mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Language</p>
                        <p className="text-sm">{volumeInfo.language.toUpperCase()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-library-primary">
              {volumeInfo.title}
            </h1>
            
            {volumeInfo.subtitle && (
              <h2 className="text-xl text-gray-600 mb-4 font-serif">
                {volumeInfo.subtitle}
              </h2>
            )}

            <div className="flex flex-wrap items-center mb-6">
              {volumeInfo.authors && volumeInfo.authors.length > 0 && (
                <div className="mr-4 mb-2">
                  <span className="text-gray-600">By</span>{" "}
                  <span className="font-medium text-library-primary">
                    {volumeInfo.authors.join(", ")}
                  </span>
                </div>
              )}

              {volumeInfo.categories && volumeInfo.categories.length > 0 && (
                <div className="flex flex-wrap">
                  {volumeInfo.categories.map((category, index) => (
                    <span
                      key={index}
                      className="bg-library-accent px-3 py-1 rounded-full text-sm text-white mr-2 mb-2"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {volumeInfo.averageRating && (
              <div className="mb-6 flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(volumeInfo.averageRating || 0)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {volumeInfo.averageRating} ({volumeInfo.ratingsCount} reviews)
                </span>
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-xl font-serif font-medium mb-3 text-library-primary">About this book</h3>
              {volumeInfo.description ? (
                <div 
                  className="prose prose-slate max-w-none"
                  dangerouslySetInnerHTML={{ __html: volumeInfo.description }}
                />
              ) : (
                <p className="text-gray-600 italic">No description available.</p>
              )}
            </div>

            {volumeInfo.industryIdentifiers && volumeInfo.industryIdentifiers.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-serif font-medium mb-3 text-library-primary">Identifiers</h3>
                <ul className="space-y-1">
                  {volumeInfo.industryIdentifiers.map((identifier, index) => (
                    <li key={index} className="text-sm">
                      <span className="font-medium">{identifier.type.replace('_', ' ')}:</span>{" "}
                      {identifier.identifier}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {volumeInfo.infoLink && (
              <div>
                <a
                  href={volumeInfo.infoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-library-accent hover:text-library-primary underline"
                >
                  More information about this book
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
