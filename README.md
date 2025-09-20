# Kitabi Keeda

A book discovery and management application that helps readers find, track, and organize their reading.

## About

Kitabi Keeda ("Book Worm" in Hindi) is a comprehensive platform for book lovers that allows you to:

- Discover new books based on your interests and preferences
- Search for books by title, author, genre, or keywords
- Create and manage your personal reading list
- Track your reading progress and set reading goals
- Rate and review books you've read
- Connect with a community of fellow readers
- Get personalized book recommendations

Whether you're an avid reader looking to organize your collection or someone searching for your next great read, Kitabi Keeda provides the tools to enhance your reading experience.

## Project Info

**URL**: https://kitabi-keeda-six.vercel.app/

## How to Run This Project

To run this project locally, you'll need Node.js and npm installed on your machine.

```sh
# Clone the repository
git clone https://github.com/YashSensei/kitabi_keeda.git

# Navigate to the project directory
cd kitabi-keeda

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env file and add your API keys

# Start the development server
npm run dev
```

The development server will start on `http://localhost:5173/` by default.

### Environment Variables

This project requires API keys for full functionality. Create a `.env` file in the root directory with:

```
VITE_GOOGLE_BOOKS_API_KEY=your_google_books_api_key_here
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

- **Google Books API Key**: Required for book search functionality. Get it from [Google Cloud Console](https://console.cloud.google.com/)
- **Gemini API Key**: Required for AI-powered book recommendations. Get it from [Google AI Studio](https://aistudio.google.com/)

For Vercel deployment, add these environment variables in your Vercel dashboard under Settings > Environment Variables.

## Technologies Used

This project is built with:

- [Vite](https://vitejs.dev/) - Fast build tool and development server
- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Reusable component library
- [React Router](https://reactrouter.com/) - Client-side routing
- [React Query](https://tanstack.com/query/latest) - Data fetching and state management
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation

## Project Structure

- `/src` - Source code
  - `/components` - Reusable UI components
  - `/pages` - Page components
  - `/hooks` - Custom React hooks
  - `/lib` - Utility functions and helpers
  - `/styles` - Global styles

## Deployment

This project can be deployed to any hosting service that supports static sites:

1. Build the project:
   ```sh
   npm run build
   ```

2. The build output will be in the `dist` directory, which can be deployed to services like Vercel, Netlify, or GitHub Pages.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
