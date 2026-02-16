export const CATEGORIES = [
  { id: 1, name: 'Terror', description: 'Libros de terror y suspenso' },
  { id: 2, name: 'Acción', description: 'Libros de acción y aventura' },
  { id: 3, name: 'Romance', description: 'Libros de romance y amor' },
  { id: 4, name: 'Ciencia Ficción', description: 'Libros de ciencia ficción' },
  { id: 5, name: 'Fantasía', description: 'Libros de fantasía y mundos mágicos' },
  { id: 6, name: 'Misterio', description: 'Libros de misterio y detectives' },
  { id: 7, name: 'Historia', description: 'Libros históricos' },
  { id: 8, name: 'Biografía', description: 'Biografías y memorias' },
  { id: 9, name: 'Tecnología', description: 'Libros sobre tecnología e informática' },
  { id: 10, name: 'Autoayuda', description: 'Libros de desarrollo personal' },
] as const;

export type CategoryName = typeof CATEGORIES[number]['name'];
