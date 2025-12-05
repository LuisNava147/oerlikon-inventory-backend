import { Injectable } from '@nestjs/common';
import { CreateTicketIncidentDto } from './dto/create-ticket-incident.dto';
import { UpdateTicketIncidentDto } from './dto/update-ticket-incident.dto';

@Injectable()
export class TicketIncidentsService {
  create(createTicketIncidentDto: CreateTicketIncidentDto) {
    return 'This action adds a new ticketIncident';
  }

  findAll() {
    return `This action returns all ticketIncidents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticketIncident`;
  }

  update(id: number, updateTicketIncidentDto: UpdateTicketIncidentDto) {
    return `This action updates a #${id} ticketIncident`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticketIncident`;
  }
}
