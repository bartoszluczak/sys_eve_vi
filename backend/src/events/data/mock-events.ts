import { randomUUID } from 'node:crypto';
import { EventLevel } from '../../common/enums/event-level.enum';
import { SystemEvent } from '../interfaces/event.interface';

const MESSAGES: Record<EventLevel, string[]> = {
  [EventLevel.DEBUG]: [
    'Cache miss for key user_session_a8f3',
    'Garbage collection completed in 42ms',
    'Database query executed in 18ms',
    'Configuration reloaded from environment',
    'Health check endpoint called',
    'WebSocket connection pool size: 12',
    'Request payload validated successfully',
    'Template cache refreshed',
  ],
  [EventLevel.INFO]: [
    'User admin@example.com logged in successfully',
    'Scheduled backup completed for database main',
    'Application started on port 3001',
    'New deployment v2.4.1 rolled out',
    'Email notification sent to ops@example.com',
    'API rate limit reset for client srv-web-01',
    'Batch job process_reports completed: 148 items',
    'SSL certificate renewed for api.example.com',
    'User session expired for uid_7291',
    'Database migration 20250115 applied successfully',
  ],
  [EventLevel.WARNING]: [
    'Disk usage exceeded 80% threshold on /dev/sda1',
    'API response time exceeded 2000ms for /api/reports',
    'Memory usage at 78% — approaching limit',
    'SSL certificate expires in 14 days',
    'Deprecated API version v1 still receiving traffic',
    'Connection pool nearing capacity: 45/50',
    'Retry attempt 3/5 for external service payment-gateway',
  ],
  [EventLevel.ERROR]: [
    'Failed to connect to database: connection timeout after 30s',
    'Unhandled exception in payment processing module',
    'Authentication service unavailable — circuit breaker open',
    'File upload failed: insufficient storage space',
    'Critical: configuration file missing at /etc/app/config.yml',
  ],
};

const DISTRIBUTION: { level: EventLevel; count: number }[] = [
  { level: EventLevel.DEBUG, count: 15 },
  { level: EventLevel.INFO, count: 18 },
  { level: EventLevel.WARNING, count: 12 },
  { level: EventLevel.ERROR, count: 5 },
];

function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

function generateEvents(): SystemEvent[] {
  const start = new Date('2025-01-01T00:00:00.000Z');
  const end = new Date('2025-01-30T23:59:59.999Z');
  const events: SystemEvent[] = [];

  for (const { level, count } of DISTRIBUTION) {
    const pool = MESSAGES[level];
    for (let i = 0; i < count; i++) {
      events.push({
        id: randomUUID(),
        level,
        message: pool[i % pool.length],
        timestamp: randomDate(start, end).toISOString(),
      });
    }
  }

  return events.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
}

export const MOCK_EVENTS: readonly SystemEvent[] = Object.freeze(
  generateEvents(),
);
