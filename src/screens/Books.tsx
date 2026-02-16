import { bookApi } from '@/lib/api';
import { CATEGORIES } from '@/constants/categories';
import type { Book } from '@/types';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '@/styles/Books.css';

export const Books = () => {
  const location = useLocation();
  const isMyBooks = location.pathname === '/my-books';
  
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const params: any = { page, limit: 12 };
      
      if (isMyBooks) {
        // Llamar al endpoint de "mis libros" que filtra por userId
        const response = await bookApi.getMyBooks(params);
        setBooks(response.data as Book[]);
        setTotalPages(response.pagination?.pages || 1);
      } else {
        // Llamar al endpoint de todos los libros con filtros
        if (search) params.search = search;
        if (selectedCategory) params.categoryId = selectedCategory;
        
        const response = await bookApi.getAll(params);
        setBooks(response.data as Book[]);
        setTotalPages(response.pagination?.pages || 1);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page, search, selectedCategory, isMyBooks]);

  return (
    <div>
      <div className="books-header">
        <h1>{isMyBooks ? 'Mis Libros' : 'Biblioteca de Libros'}</h1>
        {isMyBooks && (
          <Link to="/books/new" className="books-add-btn">
            + Agregar Libro
          </Link>
        )}
      </div>

      {/* Filters - Solo mostrar en la vista de todos los libros */}
      {!isMyBooks && (
        <div className="books-filters">
          <input
            type="text"
            placeholder="Buscar por título, autor, ISBN..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="books-search-input"
          />
          
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(1);
            }}
            className="books-category-select"
          >
            <option value="">Todas las categorías</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {loading ? (
        <p>Cargando libros...</p>
      ) : books.length === 0 ? (
        <p>
          {isMyBooks 
            ? 'Aún no has publicado ningún libro. ¡Crea tu primer libro!' 
            : 'No se encontraron libros.'}
        </p>
      ) : (
        <>
          <div className="books-grid">
            {books.map((book) => (
              <Link
                key={book.id}
                to={`/books/${book.id}`}
                className="books-card"
              >
                {book.coverImage && (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="books-card-cover"
                  />
                )}
                <h3 className="books-card-title">{book.title}</h3>
                <p className="books-card-author">
                  por {book.author}
                </p>
                {book.category && (
                  <span className="books-card-category">
                    {book.category.name}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="books-pagination">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="books-pagination-btn"
              >
                Anterior
              </button>
              
              <span className="books-pagination-info">
                Página {page} de {totalPages}
              </span>
              
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="books-pagination-btn"
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
