# SaaS Tool Directory

A modern web application for discovering and comparing SaaS tools, built with React, TypeScript, and Supabase.

![SaaS Tool Directory](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop)

## Features

- 🔍 Advanced search functionality
- 🏷️ Category-based filtering
- 📊 Detailed tool comparisons
- 💻 Responsive design
- ⚡ Real-time updates
- 🎨 Modern UI with Tailwind CSS
- 🔐 Secure data management with Supabase

## Tech Stack

- **Frontend:**
  - React 18
  - TypeScript
  - Tailwind CSS
  - React Router v6
  - TanStack Query
  - Lucide Icons

- **Backend:**
  - Supabase (PostgreSQL)
  - Row Level Security
  - Full-text Search

- **Development:**
  - Vite
  - ESLint
  - TypeScript ESLint

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Database Setup

1. Run the migration script:
   ```bash
   npm run db:migrate
   ```

2. Seed the database:
   ```bash
   npm run db:seed
   ```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and API
├── pages/         # Page components
├── providers/     # Context providers
├── routes/        # Route definitions
└── types/         # TypeScript type definitions
```

## Key Features

### Tool Management
- Comprehensive tool listings
- Detailed tool profiles
- Category organization
- Search and filtering

### Admin Interface
- Tool editing capabilities
- Content management
- Real-time updates

### User Experience
- Responsive design
- Fast search
- Intuitive navigation
- Clean UI/UX

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this project for your own purposes.

## Acknowledgments

- Icons by [Lucide](https://lucide.dev)
- UI Framework by [Tailwind CSS](https://tailwindcss.com)
- Database by [Supabase](https://supabase.com)