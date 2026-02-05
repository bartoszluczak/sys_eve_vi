import { EventLevel } from '../../common/enums/event-level.enum';

export interface SystemEvent {
  id: string;
  level: EventLevel;
  message: string;
  timestamp: string;
}
