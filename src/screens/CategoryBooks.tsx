import { bookApi } from '@/lib/api';
import { CATEGORIES } from '@/constants/categories';
import type { Book } from '@/types';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '@/styles/CategoryBooks.css';

export const CategoryBooks = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const category = CATEGORIES.find(c => c.id === Number(categoryId));

  useEffect(() => {
    const fetchBooks = async () => {
      if (!categoryId) return;
      
      try {
        setLoading(true);
        const response = await bookApi.getAll({ 
          categoryId: Number(categoryId), 
          page, 
          limit: 12 
        });
        setBooks(response.data as Book[]);
        setTotalPages(response.pagination?.pages || 1);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [categoryId, page]);

  if (!category) {
    return <div>Categoría no encontrada</div>;
  }

  return (
    <div className="category-books-container">
      <Link to="/" className="category-books-back">
        Volver al inicio
      </Link>

      <h1 className="category-books-title">{category.name}</h1>
      <p className="category-books-description">{category.description}</p>

      {loading ? (
        <p>Cargando libros...</p>
      ) : books.length === 0 ? (
        <p>No hay libros en esta categoría.</p>
      ) : (
        <>
          <div className="category-books-grid">
            {books.map((book) => (
              <Link
                key={book.id}
                to={`/books/${book.id}`}
                className="category-books-card"
              >
                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="category-books-card-cover"
                  />
                ) : (
                  <div className="category-books-card-no-cover">
                    Sin imagen
                  </div>
                )}
                <h3 className="category-books-card-title">{book.title}</h3>
                <p className="category-books-card-author">por {book.author}</p>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="category-books-pagination">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="category-books-pagination-btn"
              >
                Anterior
              </button>
              
              <span className="category-books-pagination-info">
                Página {page} de {totalPages}
              </span>
              
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="category-books-pagination-btn"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
