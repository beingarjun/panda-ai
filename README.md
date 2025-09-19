# Panda AI - GEO

Turn AI mentions on ChatGPT, Perplexity, and Google AI into traffic and customers.

## Features

- Full-stack TypeScript application
- Express backend with SQLite database
- React frontend with Vite
- JWT authentication
- Agentic analysis pipeline
- AI visibility scoring

## Quick Start

```bash
# Install dependencies
npm install
npm --workspace server install
npm --workspace web install

# Start development servers
# Terminal 1 - Backend
npm --workspace server run dev

# Terminal 2 - Frontend
npm --workspace web run dev
```

Open http://localhost:5173

## Structure

- `server/` - TypeScript + Express + SQLite backend
- `web/` - Vite + React frontend
- Root workspace configuration
