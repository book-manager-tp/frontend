import { bookApi } from '@/lib/api';
import { CATEGORIES } from '@/constants/categories';
import { BookCarousel } from '@/components/BookCarousel';
import type { Book } from '@/types';
import { useEffect, useState } from 'react';
import '@/styles/Home.css';

export const Home = () => {
  const [booksByCategory, setBooksByCategory] = useState<Record<number, Book[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooksByCategory = async () => {
      try {
        setLoading(true);
        const promises = CATEGORIES.map(async (category) => {
          const response = await bookApi.getAll({ 
            categoryId: category.id, 
            limit: 5 
          });
          return { categoryId: category.id, books: response.data as Book[] };
        });

        const results = await Promise.all(promises);
        const booksMap: Record<number, Book[]> = {};
        results.forEach(({ categoryId, books }) => {
          booksMap[categoryId] = books;
        });
        setBooksByCategory(booksMap);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooksByCategory();
  }, []);

  return (
    <div className="home-container">
      <div className="home-hero">
        <h1 className="home-title">BookManager</h1>
        <p className="home-subtitle">
          Tu biblioteca digital de libros
        </p>
      </div>

      {loading ? (
        <p>Cargando libros...</p>
      ) : (
        <div className="home-carousels">
          {CATEGORIES.map((category) => (
            <BookCarousel
              key={category.id}
              categoryId={category.id}
              categoryName={category.name}
              books={booksByCategory[category.id] || []}
            />
          ))}
        </div>
      )}
    </div>
  );
};
