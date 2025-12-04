import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {v4 as uuid} from "uuid";
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';


@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository : Repository<Employee>
  )
{}  
  
  async create(createEmployeeDto: CreateEmployeeDto) {
    try{
      const employees = this.employeeRepository.create(createEmployeeDto)
      return await this.employeeRepository.save(employees);
    }catch(error){
      throw this.duplicateDBKeyError(error)
    }
  }

  findAll() {
    return this.employeeRepository.find({
      relations:{
        location:true
      }
    });
  }

  findByLocation(id: number){
    return this.employeeRepository.findBy({
      location:{
        locationId: id
      }
    })
  }

  async findOne(id: string) {
    const employee = await this.employeeRepository.findOne({
      where:{
        employeeId: id
      },
      relations:{
        location:true
      }
    })
    if(!employee)throw new NotFoundException("empleado no encontrado")
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    try{
      const employee = await this.employeeRepository.preload({
        employeeId: id,
        ...updateEmployeeDto
      })
      if(!employee)throw new NotFoundException("No se puede actualizar")
      await this.employeeRepository.save(employee);
    return employee;
    }catch(error){
      throw this.handleDBError(error)
    }
    
  }

  async remove(id: string) {
    await this.employeeRepository.delete(id);
    return{
      message: "Empleado Eliminado"
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
