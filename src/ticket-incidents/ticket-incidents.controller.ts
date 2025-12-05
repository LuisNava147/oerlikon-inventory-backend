import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketIncidentsService } from './ticket-incidents.service';
import { CreateTicketIncidentDto } from './dto/create-ticket-incident.dto';
import { UpdateTicketIncidentDto } from './dto/update-ticket-incident.dto';

@Controller('ticket-incidents')
export class TicketIncidentsController {
  constructor(private readonly ticketIncidentsService: TicketIncidentsService) {}

  @Post()
  create(@Body() createTicketIncidentDto: CreateTicketIncidentDto) {
    return this.ticketIncidentsService.create(createTicketIncidentDto);
  }

  @Get()
  findAll() {
    return this.ticketIncidentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketIncidentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketIncidentDto: UpdateTicketIncidentDto) {
    return this.ticketIncidentsService.update(+id, updateTicketIncidentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketIncidentsService.remove(+id);
  }
}
