export enum EventLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

export interface SystemEvent {
  id: string;
  level: EventLevel;
  message: string;
  timestamp: string;
}

export interface EventsResponse {
  data: SystemEvent[];
  total: number;
}

export interface EventFilterParams {
  level?: EventLevel;
  from?: string;
  to?: string;
}
