import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateTicketIncidentDto } from './dto/create-ticket-incident.dto';
import { UpdateTicketIncidentDto } from './dto/update-ticket-incident.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketIncident } from './entities/ticket-incident.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TicketIncidentsService {
  constructor(
    @InjectRepository(TicketIncident)
    private readonly ticketIncidentRepository : Repository<TicketIncident>
  ){}

  async create(createTicketIncidentDto: CreateTicketIncidentDto) {
   try{
    const ticketIncident = this.ticketIncidentRepository.create(createTicketIncidentDto)
    return await this.ticketIncidentRepository.save(ticketIncident);
   }catch(error){
    this.handleDBError(error);
   }
  }

  findAll() {
    return this.ticketIncidentRepository.find();
  }

  async findOne(id: string) {
    const ticketIncident = await this.ticketIncidentRepository.findOne({
      where:{
        ticketIncidentId: id
      }
    })
    if(!ticketIncident)throw new NotFoundException("ticket no encontrado")
    return ticketIncident;
  }

  async update(id: string, updateTicketIncidentDto: UpdateTicketIncidentDto) {
    const ticketIncident = await this.ticketIncidentRepository.preload({
      ticketIncidentId: id,
      ...updateTicketIncidentDto
    })
    if(!ticketIncident)throw new NotFoundException("No se pudo actualizar el ticket")
    return await this.ticketIncidentRepository.save(ticketIncident);
  }

  async remove(id: string) {
    await this.ticketIncidentRepository.delete(id)
    return{
      message: "Ticket eliminado"
    }
  }

  private handleDBError(error:any):never{
    if(error.code == '23505'){
      throw new BadRequestException("Bad Request")
    }
    throw new InternalServerErrorException("Error interno al actualizar")
  }
}
