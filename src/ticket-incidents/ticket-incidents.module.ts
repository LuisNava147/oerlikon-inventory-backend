import { Module } from '@nestjs/common';
import { TicketIncidentsService } from './ticket-incidents.service';
import { TicketIncidentsController } from './ticket-incidents.controller';

@Module({
  controllers: [TicketIncidentsController],
  providers: [TicketIncidentsService],
})
export class TicketIncidentsModule {}
