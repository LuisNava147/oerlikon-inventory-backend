import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { TicketIncidentsService } from './ticket-incidents.service';
import { CreateTicketIncidentDto } from './dto/create-ticket-incident.dto';
import { UpdateTicketIncidentDto } from './dto/update-ticket-incident.dto';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';

@ApiAuth()
@Controller('ticket-incidents')
export class TicketIncidentsController {
  constructor(private readonly ticketIncidentsService: TicketIncidentsService) {}

  @Auth(ROLES.ADMIN)
  @Post()
  create(@Body() createTicketIncidentDto: CreateTicketIncidentDto) {
    return this.ticketIncidentsService.create(createTicketIncidentDto);
  }

  @Auth(ROLES.ADMIN)
  @Get()
  findAll() {
    return this.ticketIncidentsService.findAll();
  }

  @Auth(ROLES.ADMIN)
  @Get(':id')
  findOne(@Param('id',ParseUUIDPipe) id: string) {
    return this.ticketIncidentsService.findOne(id);
  }

  @Auth(ROLES.ADMIN)
  @Patch(':id')
  update(@Param('id',ParseUUIDPipe) id: string, @Body() updateTicketIncidentDto: UpdateTicketIncidentDto) {
    return this.ticketIncidentsService.update(id, updateTicketIncidentDto);
  }

  @Auth(ROLES.ADMIN)
  @Delete(':id')
  remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.ticketIncidentsService.remove(id);
  }
}
