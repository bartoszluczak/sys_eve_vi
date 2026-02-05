import { EventLevel } from '../../common/enums/event-level.enum';

export class FilterEventsDto {
  level?: EventLevel;
  from?: string;
  to?: string;
}
