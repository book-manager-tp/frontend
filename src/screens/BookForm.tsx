import { bookApi } from '@/lib/api';
import { CATEGORIES } from '@/constants/categories';
import type { Book } from '@/types';
import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '@/styles/BookForm.css';

export const BookForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    isbn: '',
    description: '',
    publishedYear: '',
    publisher: '',
    pages: '',
    language: 'Spanish',
    coverImage: '',
    available: true,
    categoryId: '',
  });

  useEffect(() => {
    if (isEditing) {
      const fetchBook = async () => {
        try {
          const response = await bookApi.getById(Number(id));
          const book = response.data as Book;
          setFormData({
            title: book.title,
            isbn: book.isbn || '',
            description: book.description || '',
            publishedYear: book.publishedYear?.toString() || '',
            publisher: book.publisher || '',
            pages: book.pages?.toString() || '',
            language: book.language || 'Spanish',
            coverImage: book.coverImage || '',
            available: book.available,
            categoryId: book.categoryId.toString(),
          });
        } catch (error) {
          console.error('Error fetching book:', error);
        }
      };

      fetchBook();
    }
  }, [id, isEditing]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = {
        ...formData,
        publishedYear: formData.publishedYear ? Number(formData.publishedYear) : undefined,
        pages: formData.pages ? Number(formData.pages) : undefined,
        categoryId: Number(formData.categoryId),
        isbn: formData.isbn || undefined,
        coverImage: formData.coverImage || undefined,
        description: formData.description || undefined,
        publisher: formData.publisher || undefined,
      };

      if (isEditing) {
        await bookApi.update(Number(id), data);
      } else {
        await bookApi.create(data);
      }

      navigate('/books');
    } catch (err: any) {
      setError(err.message || 'Error al guardar el libro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-form-container">
      <h1>{isEditing ? 'Editar Libro' : 'Agregar Nuevo Libro'}</h1>

      {error && (
        <div className="book-form-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="book-form">
        <div className="book-form-grid">
          <div className="book-form-full-width">
            <label className="book-form-label">
              Título *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="book-form-input"
            />
          </div>

          <div>
            <label className="book-form-label">
              Categoría *
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              required
              className="book-form-select"
            >
              <option value="">Seleccionar categoría</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="book-form-label">
              ISBN
            </label>
            <input
              type="text"
              value={formData.isbn}
              onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
              pattern="[0-9]{10}|[0-9]{13}"
              title="ISBN debe tener 10 o 13 dígitos"
              className="book-form-input"
            />
          </div>

          <div>
            <label className="book-form-label">
              Editorial
            </label>
            <input
              type="text"
              value={formData.publisher}
              onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
              className="book-form-input"
            />
          </div>

          <div>
            <label className="book-form-label">
              Año de Publicación
            </label>
            <input
              type="number"
              value={formData.publishedYear}
              onChange={(e) => setFormData({ ...formData, publishedYear: e.target.value })}
              min="1000"
              max={new Date().getFullYear() + 1}
              className="book-form-input"
            />
          </div>

          <div>
            <label className="book-form-label">
              Páginas
            </label>
            <input
              type="number"
              value={formData.pages}
              onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
              min="1"
              className="book-form-input"
            />
          </div>

          <div>
            <label className="book-form-label">
              Idioma
            </label>
            <input
              type="text"
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              className="book-form-input"
            />
          </div>

          <div className="book-form-full-width">
            <label className="book-form-label">
              URL de la Imagen
            </label>
            <input
              type="url"
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              placeholder="https://ejemplo.com/imagen.jpg"
              className="book-form-input"
            />
          </div>

          <div className="book-form-full-width">
            <label className="book-form-label">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="book-form-textarea"
            />
          </div>

          <div className="book-form-full-width">
            <label className="book-form-checkbox-label">
              <input
                type="checkbox"
                checked={formData.available}
                onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                className="book-form-checkbox"
              />
              <span>Libro disponible</span>
            </label>
          </div>
        </div>

        <div className="book-form-actions">
          <button
            type="submit"
            disabled={loading}
            className="book-form-submit-btn"
          >
            {loading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/books')}
            className="book-form-cancel-btn"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
