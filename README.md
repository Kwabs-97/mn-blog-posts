## Getting Started

## Features

- Create, read, update, and delete blog posts
- Modern and responsive UI
- TypeScript for type safety
- Next.js for optimal performance
- Tailwind CSS for styling

1. Clone the repository:

```bash
git clone https://github.com/yourusername/block-posts-manager.git
cd block-posts-manager
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

````

The application will be available at `http://localhost:3000`, and the API will be running at `http://localhost:3001`.

## Docker Deployment

To run the application using Docker:

```bash
docker-compose up --build
````

This will start both the frontend and API containers.

## Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint

## Tech Stack

### Core Technologies

- Next.js 15.2.3
- React 19.0.0
- React DOM 19.0.0

### State Management & Data Fetching

- Redux Toolkit 2.6.1
- React Query (TanStack Query) 5.69.0
- React Hook Form 7.54.2

### UI & Styling

- Tailwind CSS 4.x
- PostCSS 4.x
- Class Variance Authority 0.7.1
- Tailwind Merge 3.0.2
- TW Animate CSS 1.2.4
- Lucide React 0.483.0
- CLSX 2.1.1

### Development Tools

- TypeScript 5.x
- Node.js 20.x (types)


### Backend runs in the backend directory. Kindly navigate to backend and read the instructions there before spinning up the frontend server
### WORK IS BEING DONE TO DOCKERIZE THESE TWO SERVICES FOR EASY USE.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
