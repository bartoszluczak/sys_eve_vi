import type { SystemEvent } from '../types/event';
import { LevelBadge } from './LevelBadge';

interface EventTableProps {
  events: SystemEvent[];
  loading: boolean;
}

function formatTimestamp(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date(iso));
}

export function EventTable({ events, loading }: EventTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-surface-tertiary text-text-secondary text-left">
            <th className="px-4 py-3 font-medium w-44">Timestamp</th>
            <th className="px-4 py-3 font-medium w-28">Level</th>
            <th className="px-4 py-3 font-medium">Message</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {loading ? (
            <tr>
              <td
                colSpan={3}
                className="px-4 py-8 text-center text-text-secondary"
              >
                Loading...
              </td>
            </tr>
          ) : events.length === 0 ? (
            <tr>
              <td
                colSpan={3}
                className="px-4 py-8 text-center text-text-secondary"
              >
                No events found
              </td>
            </tr>
          ) : (
            events.map((event) => (
              <tr
                key={event.id}
                className="bg-surface-secondary hover:bg-surface-tertiary transition-colors"
              >
                <td className="px-4 py-3 text-text-secondary whitespace-nowrap">
                  {formatTimestamp(event.timestamp)}
                </td>
                <td className="px-4 py-3">
                  <LevelBadge level={event.level} />
                </td>
                <td className="px-4 py-3">{event.message}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
