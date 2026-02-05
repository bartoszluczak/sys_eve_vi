import { useCallback, useEffect, useRef, useState } from 'react';
import type { EventFilterParams, SystemEvent } from '../types/event';
import { getEvents } from '../services/api';

interface UseEventsResult {
  events: SystemEvent[];
  total: number;
  loading: boolean;
  error: string | null;
  fetchEvents: (filters: EventFilterParams) => void;
}

export function useEvents(): UseEventsResult {
  const [events, setEvents] = useState<SystemEvent[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fetchEvents = useCallback((filters: EventFilterParams) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    getEvents(filters, controller.signal)
      .then((res) => {
        setEvents(res.data);
        setTotal(res.total);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });
  }, []);

  useEffect(() => {
    fetchEvents({});
    return () => abortRef.current?.abort();
  }, [fetchEvents]);

  return { events, total, loading, error, fetchEvents };
}
