## Getting Started

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

4. In a separate terminal, start the JSON Server API:

```bash
npm run api
# or
yarn api
```

The application will be available at `http://localhost:3000`, and the API will be running at `http://localhost:3001`.

## Docker Deployment

To run the application using Docker:

```bash
docker-compose up --build
```

This will start both the frontend and API containers.

## API

The application uses JSON Server as a mock API. The `db.json` file is hosted on Render and contains the blog posts data.

## Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run api` - Start the JSON Server API

## Technologies Used

- Next.js 15
- React 19
- Tailwind CSS
- Redux Toolkit
- React Query
- JSON Server
- Docker
- TypeScript

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
