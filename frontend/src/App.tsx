import { EventFilters } from './components/EventFilters';
import { EventTable } from './components/EventTable';
import { useEvents } from './hooks/useEvents';
import type { EventFilterParams } from './types/event';

function App() {
  const { events, total, loading, error, fetchEvents } = useEvents();

  const handleApply = (filters: EventFilterParams) => {
    fetchEvents(filters);
  };

  return (
    <div className="min-h-screen bg-surface-primary px-6 py-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold text-white mb-6">
        System Events
      </h1>

      <div className="mb-6">
        <EventFilters onApply={handleApply} />
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-md bg-red-950 text-red-400 text-sm border border-red-900">
          {error}
        </div>
      )}

      <div className="mb-4 text-sm text-text-secondary">
        {!loading && `${total} event${total !== 1 ? 's' : ''}`}
      </div>

      <EventTable events={events} loading={loading} />
    </div>
  );
}

export default App;
