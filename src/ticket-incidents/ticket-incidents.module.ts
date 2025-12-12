import { Module } from '@nestjs/common';
import { TicketIncidentsService } from './ticket-incidents.service';
import { TicketIncidentsController } from './ticket-incidents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketIncident } from './entities/ticket-incident.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([TicketIncident])
  ],
  controllers: [TicketIncidentsController],
  providers: [TicketIncidentsService],
})
export class TicketIncidentsModule {}
