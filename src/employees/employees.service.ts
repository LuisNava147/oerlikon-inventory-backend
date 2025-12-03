import { Injectable } from '@nestjs/common';
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
  private employees: CreateEmployeeDto[] = [
    {
      employeeId: uuid(),
      employeeName: "Luis",
      employeeLastname: "Hernandez",
      employeePhoneNumber: "4424859526",
      employeeEmail: "luis.hernandez@oerlikon.com",  

    }
  ]

  async create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.employeeId = uuid()
    return createEmployeeDto
  }

  findAll() {
  
    return this.employeeRepository.find();
    
  }

  findOne(id: string) {
    
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: string) {
    return `This action removes a #${id} employee`;
  }
}
