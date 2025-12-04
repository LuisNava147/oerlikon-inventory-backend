import { Injectable, NotFoundException } from '@nestjs/common';
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
    const employees = this.employeeRepository.create(createEmployeeDto)
    return this.employeeRepository.save(employees);
  }

  findAll() {
  
    return this.employeeRepository.find();
    
  }

  findOne(id: string) {
    const employee = this.employeeRepository.findOne({
      where:{
        employeeId: id
      }
    })
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.employeeRepository.preload({
      employeeId: id,
      ...updateEmployeeDto
    })
    if(!employee)throw new NotFoundException("No se puede actualizar")
    return await this.employeeRepository.save(employee);
    
  }

  async remove(id: string) {
    return await this.employeeRepository.delete(id);
  }
}
