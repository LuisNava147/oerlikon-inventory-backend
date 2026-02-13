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
    .leftJoinAndSelect('department.location', 'location')

    .loadRelationCountAndMap('department.printerCount', 'department.device', 'printer',
    (qb) => qb.where('printer.deviceType ILIKE :printerType', { printerType: '%Printer%' }))
   
    .loadRelationCountAndMap('department.deviceCount', 'department.device', 'computer',
      (qb) => qb.where('computer.deviceType ILIKE :laptop OR computer.deviceType ILIKE :desktop', {
        laptop: '%Laptop%',
        desktop: '%Desktop%'
      }))

      .loadRelationCountAndMap('department.mobileCount', 'department.device', 'mobile', 
      (qb) => qb.where("(mobile.deviceType ILIKE '%Celular%' OR mobile.deviceType ILIKE '%iPad%' OR mobile.deviceType ILIKE '%Tablet%')"))

      .loadRelationCountAndMap('department.accesoriesCount', 'department.device', 'accessory',
      (qb) => qb.where('accessory.deviceType ILIKE :acc1 OR accessory.deviceType ILIKE :acc2 OR accessory.deviceType ILIKE :acc3', {
        acc1: '%Teclado%',
        acc2: '%Mouse%',
        acc3: '%Token%'
      }))

      .loadRelationCountAndMap('department.barcodeCount', 'department.device', 'scanner',
      (qb) => qb.where('scanner.deviceType ILIKE :scannerType', { scannerType: '%Lector%' }))

      .loadRelationCountAndMap('department.monitorCount', 'department.device', 'monitor',
      (qb) => qb.where('monitor.deviceType ILIKE :monitorType', { monitorType: '%Monitor%' }))

    .loadRelationCountAndMap('department.employeeCount','department.employee','employee')

    .orderBy('department.departmentName','ASC')
    .getMany()
    return department
  }

  async findOne(id: string) {
    const department = await this.departmentRepository.findOne({
     where:{
      departmentId: id
     },
      relations:{
        location:true
      }
     
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
