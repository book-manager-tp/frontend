# Book Manager - Frontend

Este proyecto es una aplicacion frontend desarrollada en React con TypeScript que permite gestionar una biblioteca de libros. Incluye autenticacion de usuarios, visualizacion de catalogos, gestion de libros personales y navegacion por categorias.

## Descripcion

Book Manager Frontend es una interfaz web donde los usuarios pueden explorar un catalogo de libros por categorias, registrarse, iniciar sesion y gestionar su propia coleccion de libros. La aplicacion consume una API REST protegida con JWT y ofrece una experiencia de usuario fluida con React Router para la navegacion.

## Instalacion y ejecucion

### Requisitos
- Node.js 16 o superior
- Backend de Book Manager ejecutandose

### 1. Configurar el frontend

```bash
cd frontend
npm install
```

Copia el archivo .env.example a .env y edita la URL de la API:

```bash
cp .env.example .env
```

Ejemplo de .env:

```
API_URL=http://localhost:3000/api
```

Inicia el frontend:

```bash
npm run dev
```

El frontend estara disponible en http://localhost:5173

## Funcionalidades

### Paginas publicas

- **Home**: Pagina principal con carrusel de libros destacados y categorias
- **Books**: Catalogo completo de libros disponibles
- **Category Books**: Libros filtrados por categoria
- **Book Detail**: Informacion detallada de un libro
- **Login**: Inicio de sesion
- **Register**: Registro de nuevos usuarios

### Paginas protegidas (requieren autenticacion)

- **My Books**: Gestion de libros personales del usuario
- **Add Book**: Formulario para crear un nuevo libro
- **Edit Book**: Formulario para editar un libro existente

## Estructura del proyecto

```
frontend/
├── src/
│   ├── assets/          # Recursos estaticos
│   ├── components/      # Componentes reutilizables
│   │   ├── BookCarousel.tsx
│   │   ├── Layout.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── title.tsx
│   ├── constants/       # Constantes de la aplicacion
│   ├── contexts/        # Context API (AuthContext)
│   ├── hooks/           # Hooks personalizados
│   ├── lib/             # Configuracion de API
│   ├── providers/       # Providers de la aplicacion
│   ├── screens/         # Paginas de la aplicacion
│   │   ├── BookDetail.tsx
│   │   ├── BookForm.tsx
│   │   ├── Books.tsx
│   │   ├── Categories.tsx
│   │   ├── CategoryBooks.tsx
│   │   ├── home.tsx
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── styles/          # Archivos CSS
│   ├── types/           # Definiciones de TypeScript
│   ├── main.tsx         # Punto de entrada
│   └── router.tsx       # Configuracion de rutas
├── .env                 # Variables de entorno
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Rutas de la aplicacion

### Rutas publicas
- `/` - Pagina principal
- `/books` - Catalogo de libros
- `/books/:id` - Detalle de un libro
- `/category/:categoryId` - Libros por categoria
- `/login` - Inicio de sesion
- `/register` - Registro de usuario

### Rutas protegidas
- `/my-books` - Mis libros
- `/books/new` - Agregar nuevo libro
- `/books/:id/edit` - Editar libro

## Contexto de autenticacion

La aplicacion utiliza Context API para manejar el estado de autenticacion global. El `AuthContext` proporciona:

- `user`: Informacion del usuario autenticado
- `token`: Token JWT de autenticacion
- `login`: Funcion para iniciar sesion
- `logout`: Funcion para cerrar sesion
- `register`: Funcion para registrar un nuevo usuario

## API Client

El archivo `lib/api.ts` contiene la configuracion del cliente HTTP que:

- Establece la URL base de la API
- Agrega automaticamente el token JWT a las peticiones protegidas
- Maneja errores de autenticacion
- Proporciona funciones helper para GET, POST, PUT y DELETE

## Tecnologias utilizadas

- React 18
- TypeScript
- Vite
- React Router DOM
- Context API
- Biome (linting y formateo)

## Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicacion para produccion
- `npm run preview` - Previsualiza la version de produccion
- `npm run lint` - Ejecuta el linter
- `npm run format` - Formatea el codigo

## Componentes principales

### Layout
Componente que envuelve todas las paginas y proporciona la navegacion principal con header y enlaces al catalogo, categorias y opciones de usuario.

### ProtectedRoute
Componente que protege las rutas privadas, verificando si el usuario esta autenticado antes de permitir el acceso.

### BookCarousel
Carrusel de libros para la pagina principal que muestra los libros destacados de forma visual.

## Personalizacion

Los estilos de cada componente se encuentran en la carpeta `src/styles/` y pueden ser modificados segun las necesidades del proyecto. La aplicacion utiliza CSS puro sin frameworks de estilos adicionales.
