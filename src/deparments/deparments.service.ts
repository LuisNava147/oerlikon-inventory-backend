import { Injectable } from '@nestjs/common';
import { CreateDeparmentDto } from './dto/create-deparment.dto';
import { UpdateDeparmentDto } from './dto/update-deparment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Deparment } from './entities/deparment.entity';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';


@Injectable()
export class DeparmentsService {
  constructor(
    @InjectRepository(Deparment)
    private readonly departmentRepository : Repository<Deparment>
  ){}
  
  async create(createDeparmentDto: CreateDeparmentDto) {
    try{
      const department = this.departmentRepository.create(createDeparmentDto)
      return await this.departmentRepository.save(department);
    }catch(error){
      throw this.handleDBError(error+" Error al crear el departamento")
    }
    
  }

  async findAll() {
    const department = await this.departmentRepository.createQueryBuilder('department')
    .loadRelationCountAndMap('department.printerCount','department.device','device',
    (qb)=> qb.where('device.deviceType ILIKE :type',{type:'%Printer%'}))
    .orderBy('department.departmentName','ASC')
    .getMany()
    return department
  }

  async findOne(id: string) {
    const department = await this.departmentRepository.findOneBy({
      departmentId: id
    })
    if(!department)throw new NotFoundException("el departamento no existe")
    return department;
  }


  async update(id: string, updateDeparmentDto: UpdateDeparmentDto) {
    try{
      const department = await this.departmentRepository.preload({
        departmentId: id,
        ...updateDeparmentDto
      })
      if(!department)throw new NotFoundException("El departamento seleccionado no se puede actualizarse")
      return await this.departmentRepository.save(department);
    }catch(error){
    throw this.handleDBError(error)
    }
  }

  async remove(id: string) {
    const department = await this.findOne(id)
    await this.departmentRepository.delete(department)
    return{
      message:"Departamento eliminado"
    }
  }

  private handleDBError(error:any):never{
    if(error.code == '23505'){
      throw new BadRequestException("Bad Request")
    }
    throw new InternalServerErrorException("Error interno al actualizar el departamento")
  }
}
