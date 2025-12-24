# SWStarter Frontend

React application for searching Star Wars characters and films.

## Running Locally (without Docker)

### Prerequisites

- Node.js 20+
- Backend running on http://localhost:3001

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at http://localhost:5173

### Environment Variables

| Variable       | Default | Description          |
| -------------- | ------- | -------------------- |
| `VITE_API_URL` | /api    | Backend API base URL |

For local development with backend on port 3001:

```bash
VITE_API_URL=http://localhost:3001/api npm run dev
```

## Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.
