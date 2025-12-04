import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>
  ){}
  async create(createLocationDto: CreateLocationDto) {
    try{
      const location= this.locationRepository.create(createLocationDto)
      return await this.locationRepository.save(location)
    }catch(error){
      throw this.duplicateDBKeyError(error)
    }
    
  }

  findAll() {
    return this.locationRepository.find();
  }

  async findOne(id: number) {
    const location = await this.locationRepository.findOneBy({
      locationId: id,
    })
    if(!location)throw new NotFoundException("Locación no encontrada")
    return location
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    try{
      const location = await this.locationRepository.preload({
        locationId: id,
        ...updateLocationDto,
      })
      if(!location)throw new NotFoundException("No es posible actualizar la locación")
      return await this.locationRepository.save(location)
    }catch(error){
      throw this.handleDBError(error)
    }
  }

  async remove(id: number) {
    await this.locationRepository.delete(id)
    return{
      message: "Se ha eliminado la locación"
    } 
  }

  private handleDBError(error:any):never{
    if(error.code == '23505'){
      throw new BadRequestException("Bad Request")
    }
    throw new InternalServerErrorException("Error interno al actualizar el empleado")
  }

  private duplicateDBKeyError(error:any):never{
    if(error.code == '23505'){
      throw new ConflictException("Uno de estos o los dos valores ya está registrado: 'Correo'y/o'numero")
    }
    throw new InternalServerErrorException("Error interno al crear el empleado")
  }
}
