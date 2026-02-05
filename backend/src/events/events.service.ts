import { BadRequestException, Injectable } from '@nestjs/common';
import { EventLevel, LEVEL_SEVERITY } from '../common/enums/event-level.enum';
import { SystemEvent } from './interfaces/event.interface';
import { FilterEventsDto } from './dto/filter-events.dto';
import { MOCK_EVENTS } from './data/mock-events';

@Injectable()
export class EventsService {
  findAll(filters: FilterEventsDto): { data: SystemEvent[]; total: number } {
    let result = [...MOCK_EVENTS];

    if (filters.level) {
      if (!Object.values(EventLevel).includes(filters.level)) {
        throw new BadRequestException(
          `Invalid level. Must be one of: ${Object.values(EventLevel).join(', ')}`,
        );
      }
      const minSeverity = LEVEL_SEVERITY[filters.level];
      result = result.filter((e) => LEVEL_SEVERITY[e.level] >= minSeverity);
    }

    if (filters.from) {
      const fromTime = new Date(filters.from).getTime();
      if (isNaN(fromTime)) {
        throw new BadRequestException('Invalid "from" date format. Use ISO 8601');
      }
      result = result.filter((e) => new Date(e.timestamp).getTime() >= fromTime);
    }

    if (filters.to) {
      const toTime = new Date(filters.to).getTime();
      if (isNaN(toTime)) {
        throw new BadRequestException('Invalid "to" date format. Use ISO 8601');
      }
      result = result.filter((e) => new Date(e.timestamp).getTime() <= toTime);
    }

    if (filters.from && filters.to) {
      const fromTime = new Date(filters.from).getTime();
      const toTime = new Date(filters.to).getTime();
      if (fromTime > toTime) {
        throw new BadRequestException('"from" date must be before "to" date');
      }
    }

    return { data: result, total: result.length };
  }
}
