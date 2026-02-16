import type { Book } from '@/types';
import { Link } from 'react-router-dom';
import '@/styles/BookCarousel.css';

interface BookCarouselProps {
  books: Book[];
  categoryName: string;
  categoryId: number;
}

export const BookCarousel = ({ books, categoryName, categoryId }: BookCarouselProps) => {
  return (
    <div className="carousel-container">
      <div className="carousel-header">
        <h2 className="carousel-title">{categoryName}</h2>
        <Link to={`/category/${categoryId}`} className="carousel-view-all">
          Ver todos
        </Link>
      </div>
      
      <div className="carousel-scroll">
        {books.length === 0 ? (
          <p className="carousel-empty">No hay libros en esta categoría</p>
        ) : (
          books.map((book) => (
            <Link
              key={book.id}
              to={`/books/${book.id}`}
              className="carousel-card"
            >
              {book.coverImage ? (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="carousel-card-cover"
                />
              ) : (
                <div className="carousel-card-no-cover">
                  Sin imagen
                </div>
              )}
              <h3 className="carousel-card-title">{book.title}</h3>
              <p className="carousel-card-author">{book.author}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
