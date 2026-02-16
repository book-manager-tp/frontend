import { categoryApi } from '@/lib/api';
import type { Category } from '@/types';
import { useEffect, useState } from 'react';
import '@/styles/Categories.css';

export const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <div className="categories-header">
        <h1>Categorías</h1>
      </div>

      {loading ? (
        <p>Cargando categorías...</p>
      ) : categories.length === 0 ? (
        <p>No hay categorías disponibles.</p>
      ) : (
        <div className="categories-grid">
          {categories.map((category) => (
            <div key={category.id} className="categories-card">
              <h3 className="categories-card-title">{category.name}</h3>
              {category.description && (
                <p className="categories-card-description">{category.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};