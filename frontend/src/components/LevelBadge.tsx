import { EventLevel } from '../types/event';

const LEVEL_STYLES: Record<EventLevel, string> = {
  [EventLevel.DEBUG]: 'bg-slate-800 text-slate-400',
  [EventLevel.INFO]: 'bg-sky-950 text-sky-400',
  [EventLevel.WARNING]: 'bg-amber-950 text-amber-400',
  [EventLevel.ERROR]: 'bg-red-950 text-red-400',
};

export function LevelBadge({ level }: { level: EventLevel }) {
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${LEVEL_STYLES[level]}`}
    >
      {level}
    </span>
  );
}
