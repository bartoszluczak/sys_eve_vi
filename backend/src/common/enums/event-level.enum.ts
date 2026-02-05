export enum EventLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

export const LEVEL_SEVERITY: Record<EventLevel, number> = {
  [EventLevel.DEBUG]: 0,
  [EventLevel.INFO]: 1,
  [EventLevel.WARNING]: 2,
  [EventLevel.ERROR]: 3,
};
