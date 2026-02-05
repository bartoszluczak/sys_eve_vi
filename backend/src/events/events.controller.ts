import { Controller, Get, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { FilterEventsDto } from './dto/filter-events.dto';

@Controller('api/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll(@Query() query: FilterEventsDto) {
    return this.eventsService.findAll(query);
  }
}
