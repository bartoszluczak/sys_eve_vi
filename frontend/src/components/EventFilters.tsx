import { type FormEvent, useState } from 'react';
import type { EventFilterParams } from '../types/event';
import { EventLevel } from '../types/event';

interface EventFiltersProps {
  onApply: (filters: EventFilterParams) => void;
}

const LEVEL_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'All Levels' },
  { value: EventLevel.DEBUG, label: 'DEBUG' },
  { value: EventLevel.INFO, label: 'INFO+' },
  { value: EventLevel.WARNING, label: 'WARNING+' },
  { value: EventLevel.ERROR, label: 'ERROR' },
];

const inputClasses =
  'bg-surface-secondary border border-border rounded-md px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors';

export function EventFilters({ onApply }: EventFiltersProps) {
  const [level, setLevel] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const filters: EventFilterParams = {};
    if (level) filters.level = level as EventLevel;
    if (from) filters.from = from;
    if (to) filters.to = to;
    onApply(filters);
  };

  const handleReset = () => {
    setLevel('');
    setFrom('');
    setTo('');
    onApply({});
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-text-secondary">Level</label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className={inputClasses}
        >
          {LEVEL_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-text-secondary">From</label>
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className={inputClasses}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-text-secondary">To</label>
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className={inputClasses}
        />
      </div>

      <button
        type="submit"
        className="bg-accent hover:bg-accent-hover text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
      >
        Apply
      </button>

      <button
        type="button"
        onClick={handleReset}
        className="border border-border text-text-secondary hover:text-text-primary text-sm px-4 py-2 rounded-md transition-colors"
      >
        Reset
      </button>
    </form>
  );
}
