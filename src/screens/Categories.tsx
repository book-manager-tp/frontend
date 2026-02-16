import { useAuth } from '@/contexts/AuthContext';
import { categoryApi } from '@/lib/api';
import type { Category } from '@/types';
import { useEffect, useState, type FormEvent } from 'react';
import '@/styles/Categories.css';

export const Categories = () => {
  const { isAuthenticated } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const fetchCategories = async () => {
    try {
      const response = await categoryApi.getAll({ limit: 100 });
      setCategories(response.data as Category[]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (editingId) {
        await categoryApi.update(editingId, formData);
      } else {
        await categoryApi.create(formData);
      }

      setFormData({ name: '', description: '' });
      setShowForm(false);
      setEditingId(null);
      fetchCategories();
    } catch (err: any) {
      setError(err.message || 'Error al guardar la categoría');
    }
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setFormData({
      name: category.name,
      description: category.description || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de eliminar esta categoría?')) return;

    try {
      await categoryApi.delete(id);
      fetchCategories();
    } catch (err: any) {
      alert(err.message || 'Error al eliminar. Puede que la categoría tenga libros asociados.');
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: '', description: '' });
    setError('');
  };

  return (
    <div>
      <div className="categories-header">
        <h1>Categorías</h1>
        {isAuthenticated && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="categories-add-btn"
          >
            + Nueva Categoría
          </button>
        )}
      </div>

      {showForm && (
        <div className="categories-form-container">
          <h3>{editingId ? 'Editar Categoría' : 'Nueva Categoría'}</h3>

          {error && (
            <div className="categories-form-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="categories-form-group">
              <label className="categories-label">
                Nombre *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="categories-input"
              />
            </div>

            <div className="categories-form-group">
              <label className="categories-label">
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="categories-textarea"
              />
            </div>

            <div className="categories-form-actions">
              <button type="submit" className="categories-submit-btn">
                {editingId ? 'Actualizar' : 'Crear'}
              </button>
              <button
                type="button"
                onClick={cancelForm}
                className="categories-cancel-btn"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p>Cargando categorías...</p>
      ) : categories.length === 0 ? (
        <p>No hay categorías disponibles.</p>
      ) : (
        <div className="categories-grid">
          {categories.map((category) => (
            <div key={category.id} className="categories-card">
              <div>
                <h3 className="categories-card-title">{category.name}</h3>
                {category.description && (
                  <p className="categories-card-description">{category.description}</p>
                )}
              </div>

              {isAuthenticated && (
                <div className="categories-card-actions">
                  <button
                    onClick={() => handleEdit(category)}
                    className="categories-edit-btn"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="categories-delete-btn"
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
