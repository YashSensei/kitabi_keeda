
import { Book } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BookType } from '../types/book';

type BookCardProps = {
  book: BookType;
};

const BookCard = ({ book }: BookCardProps) => {
  return (
    <Link to={`/book/${book.id}`} className="book-card group bg-library-secondary border border-library-accent/10">
      <div className="relative overflow-hidden">
        {book.volumeInfo.imageLinks?.thumbnail ? (
          <img
            src={book.volumeInfo.imageLinks.thumbnail.replace('http:', 'https:')}
            alt={book.volumeInfo.title}
            className="book-card-image group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="book-card-image flex items-center justify-center bg-library-dark">
            <Book className="h-20 w-20 text-library-accent opacity-40" />
          </div>
        )}
        
        {book.volumeInfo.categories && book.volumeInfo.categories.length > 0 && (
          <span className="absolute top-2 right-2 bg-library-accent/90 text-white text-xs py-1 px-2 rounded-full">
            {book.volumeInfo.categories[0]}
          </span>
        )}
      </div>
      
      <div className="book-card-content">
        <h3 className="font-serif font-medium text-lg mb-1 line-clamp-2 text-library-text group-hover:text-library-accent transition-colors">
          {book.volumeInfo.title}
        </h3>
        
        <p className="text-sm text-library-light mb-2">
          {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
        </p>
        
        <p className="text-sm line-clamp-3 text-library-light mb-4 flex-grow">
          {book.volumeInfo.description || 'No description available.'}
        </p>
        
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-library-accent/10">
          <span className="text-xs text-library-light">
            {book.volumeInfo.publishedDate?.slice(0, 4) || 'N/A'}
          </span>
          <span className="text-sm font-medium text-library-accent hover:text-library-highlight">
            Read more
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
