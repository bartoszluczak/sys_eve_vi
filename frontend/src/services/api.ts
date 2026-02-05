import type { EventFilterParams, EventsResponse } from '../types/event';

export async function getEvents(
  filters: EventFilterParams,
  signal?: AbortSignal,
): Promise<EventsResponse> {
  const params = new URLSearchParams();

  if (filters.level) params.set('level', filters.level);
  if (filters.from) params.set('from', new Date(filters.from).toISOString());
  if (filters.to) params.set('to', new Date(filters.to).toISOString());

  const url = `/api/events${params.toString() ? `?${params}` : ''}`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || 'Failed to fetch events');
  }

  return response.json();
}
