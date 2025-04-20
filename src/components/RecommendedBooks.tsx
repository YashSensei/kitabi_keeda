
import { useEffect, useState } from 'react';
import { BookType } from '../types/book';
import { searchBooks } from '../services/api';
import BookCard from './BookCard';
import { BookOpen } from 'lucide-react';

const RecommendedBooks = () => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedBooks = async () => {
      try {
        // Initially fetch some popular books
        const results = await searchBooks('bestsellers+fiction+2024');
        setBooks(results.items || []);
      } catch (error) {
        console.error('Error fetching recommended books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <BookOpen className="h-8 w-8 text-library-accent animate-pulse" />
      </div>
    );
  }

  return (
    <section className="py-12">
      <h2 className="text-3xl font-serif font-bold mb-8 text-library-text text-center">
        Featured Books
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.slice(0, 8).map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
};

export default RecommendedBooks;
