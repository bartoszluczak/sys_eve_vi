# System Events Viewer

A full-stack application for browsing and filtering system events. Built with **NestJS** (backend) and **React** (frontend).

## Quick Start

```bash
bun install
bun run dev
```

This starts the backend on `http://localhost:3001` and the frontend on `http://localhost:5173`.

## Project Structure

```
├── backend/          NestJS API (port 3001)
│   └── src/
│       ├── events/   Events module (controller, service, mock data)
│       └── common/   Shared enums (EventLevel)
└── frontend/         React + Vite + Tailwind CSS (port 5173)
    └── src/
        ├── components/   EventTable, EventFilters, LevelBadge
        ├── hooks/        useEvents (data fetching)
        ├── services/     API client
        └── types/        TypeScript interfaces
```

## API

### `GET /api/events`

Returns a list of system events with optional filtering.

| Parameter | Type   | Description                            |
|-----------|--------|----------------------------------------|
| `level`   | string | Minimum level: DEBUG, INFO, WARNING, ERROR |
| `from`    | string | ISO 8601 start date                    |
| `to`      | string | ISO 8601 end date                      |

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "level": "WARNING",
      "message": "Disk usage exceeded 80%",
      "timestamp": "2025-01-18T14:32:07.000Z"
    }
  ],
  "total": 17
}
```

Level filtering uses severity ordering — selecting `WARNING` returns both WARNING and ERROR events.

## Tech Stack

- **Backend:** NestJS, TypeScript
- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4
- **Package manager:** Bun
# sys_eve_vi
