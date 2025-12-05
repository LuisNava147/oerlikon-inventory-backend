import { PartialType } from '@nestjs/swagger';
import { CreateTicketIncidentDto } from './create-ticket-incident.dto';

export class UpdateTicketIncidentDto extends PartialType(CreateTicketIncidentDto) {}
