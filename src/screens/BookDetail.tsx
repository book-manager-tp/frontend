import { useAuth } from '@/contexts/AuthContext';
import { bookApi } from '@/lib/api';
import type { Book } from '@/types';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '@/styles/BookDetail.css';

export const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await bookApi.getById(Number(id));
        setBook(response.data as Book);
      } catch (error) {
        console.error('Error fetching book:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBook();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este libro?')) return;

    try {
      setDeleting(true);
      await bookApi.delete(Number(id));
      navigate('/books');
    } catch (error: any) {
      alert(error.message || 'Error al eliminar el libro');
      setDeleting(false);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (!book) return <div>Libro no encontrado</div>;

  const canEdit = user && (user.id === book.userId || user.role === 'admin');

  return (
    <div>
      <Link to="/books" className="book-detail-back-link">
        ← Volver a la lista
      </Link>

      <div className={`book-detail-container ${book.coverImage ? 'with-cover' : ''}`}>
        {book.coverImage && (
          <img
            src={book.coverImage}
            alt={book.title}
            className="book-detail-cover"
          />
        )}

        <div>
          <h1 className="book-detail-title">{book.title}</h1>
          <h2 className="book-detail-author">
            por {book.author}
          </h2>

          {book.category && (
            <span className="book-detail-category">
              {book.category.name}
            </span>
          )}

          <div className="book-detail-info">
            {book.isbn && <p><strong>ISBN:</strong> {book.isbn}</p>}
            {book.publisher && <p><strong>Editorial:</strong> {book.publisher}</p>}
            {book.publishedYear && <p><strong>Año:</strong> {book.publishedYear}</p>}
            {book.pages && <p><strong>Páginas:</strong> {book.pages}</p>}
            {book.language && <p><strong>Idioma:</strong> {book.language}</p>}
            <p>
              <strong>Disponible:</strong>{' '}
              <span className={book.available ? 'book-detail-available' : 'book-detail-unavailable'}>
                {book.available ? 'Sí' : 'No'}
              </span>
            </p>
          </div>

          {book.description && (
            <div className="book-detail-description">
              <h3>Descripción</h3>
              <p className="book-detail-description-text">{book.description}</p>
            </div>
          )}

          {book.user && (
            <div className="book-detail-user-info">
              <p><strong>Agregado por:</strong> {book.user.name}</p>
              <p className="book-detail-user-date">
                {new Date(book.createdAt).toLocaleDateString('es-ES')}
              </p>
            </div>
          )}

          {canEdit && (
            <div className="book-detail-actions">
              <Link
                to={`/books/${book.id}/edit`}
                className="book-detail-edit-btn"
              >
                Editar
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="book-detail-delete-btn"
              >
                {deleting ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
