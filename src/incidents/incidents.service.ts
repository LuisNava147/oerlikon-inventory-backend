import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Incident } from './entities/incident.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IncidentsService {
  constructor(
    @InjectRepository(Incident)
    private readonly incidentRepository : Repository<Incident>,
  ){}

  async create(createIncidentDto: CreateIncidentDto) {
    try{
      const incident = this.incidentRepository.create(createIncidentDto)
      return await this.incidentRepository.save(incident);
    }catch(error){
      this.handleDBError(error)
    }
  }

  findAll() {
    return this.incidentRepository.find({
      relations:{
        department: true,
        device: true,
      }
    });
  }

  async findOne(id: string) {
    const incident = await this.incidentRepository.findOne({
      where:{
        incidentId: id,
      },
      relations:{
        department: true,
        device: true
      }
    })
    if(!incident)throw new NotFoundException("No se encontró el incidente")
    return incident;
  }

  async update(id: string, updateIncidentDto: UpdateIncidentDto) {
    const incident= await this.incidentRepository.preload({
      incidentId: id,
      ...updateIncidentDto,
    })
    if(!incident)throw new NotFoundException("Incidente no encontrado")
    return await this.incidentRepository.save(incident);
  }

  async remove(id: string) {
    await this.incidentRepository.delete(id)
    return {
      message: "Incidente eliminado"
    };
  }

  private handleDBError(error:any):never{
    if(error.code == '23505'){
      throw new BadRequestException("Bad Request")
    }
    throw new InternalServerErrorException("Error interno al actualizar")
  }
}
