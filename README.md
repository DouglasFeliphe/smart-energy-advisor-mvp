# Smart Energy Advisor MVP - Frontend

A modern web application built with React, TypeScript, and Vite that helps users analyze and optimize their energy consumption patterns. The application provides personalized recommendations using AI-powered insights through the Hugging Face API.

## Features

- 💡 AI-powered recommendations for energy savings
- 💰 Cost analysis and savings projections
- 📊 Interactive dashboards and visualizations
- 🌱 CO₂ emission tracking and environmental impact

## Tech Stack

- React 18
- TypeScript 5
- Vite
- Hugging Face API Integration (for chat completions)
- Tailwind CSS

## Getting Started

1. Clone the repository

```bash
git clone <your-repo-url>
cd frontend
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables
   Create a `.env` file in the root directory with:

```env
VITE_HUGGING_FACE_API_URL=your_api_url
VITE_HUGGING_FACE_TOKEN=your_token
```

4. Start the development server

```bash
npm run dev
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run preview` - Preview production build

### Project Structure

```
frontend/
├── src/
│   ├── components/   # Reusable UI components
│   ├── pages/        # Route components
│   ├── services/     # API and external services
│   ├── hooks/        # Custom React hooks
│   ├── mutations/    # Service Mutations
│   ├── utils/        # Helper functions
│   └── config/       # Configuration files
├── public/           # Static assets
└── tests/            # Test files
```

## ESLint Configuration

The project uses a robust ESLint setup for maintaining code quality. Here's the current configuration:

```js
// ...existing ESLint configuration code...
```

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
