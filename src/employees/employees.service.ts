import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {v4 as uuid} from "uuid";
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { ILike, Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';


@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository : Repository<Employee>,
    @InjectRepository(User)
    private readonly userRepository : Repository<User>,
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
    return this.employeeRepository.createQueryBuilder('employee')
    .leftJoinAndSelect('employee.location','location')
    .leftJoinAndSelect('employee.device','device')
    .leftJoinAndSelect('employee.user','user')
    .leftJoinAndSelect('employee.department','department')

    .loadRelationCountAndMap(
      'employee.devicesCount',
      'employee.device',
      'device'
    )

    .orderBy('employee.employeeName','ASC')
    .getMany()

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
        location:true,
        device:true,
        user:true,
        department:true,
      }
    })
    if(!employee)throw new NotFoundException("empleado no encontrado")
    return employee;
  }

  async findByEmployeeName(name:string){
    const employee = await this.employeeRepository.find({
      where:[{
        employeeName: ILike(`%${name}%`)
      },{
        employeeLastName: ILike(`%${name}%`)
      }],
      relations:{
        location:true,
        device:true,
        user:true,
        department:true,
      }
    })
    return employee;
  }

  async findByLocationName(name:string){
    const location= await this.employeeRepository.find({
      where:{
        location:{
          locationName: ILike(`%${name}%`)
        }
      }, 
      relations:{
        location:true,
        device:true,
        user:true,
        department:true,
      }
    })
    return location;
  }

  async findByEmployeeEmail(email:string){
    const employee = await this.employeeRepository.find({
      where:{
        employeeEmail: ILike(`%${email}%`)
      },
      relations:{
        location:true,
        device:true,
        user:true,
        department:true,
      }
    })
    return employee;
  }

  async findByEmployeePhoneNumber(phone:string){
    const employee = await this.employeeRepository.find({
      where:{
        employeePhoneNumber: ILike(`%${phone}%`)
      },
      relations:{
        location:true,
        device:true,
        user:true,
        department:true,
      }
    })
    return employee
  }

  async findByDepartmentName(name:string){
    const employee = await this.employeeRepository.find({
      where:{
        department:{
          departmentName: ILike(`%${name}%`)
        }
      },
      relations:{
        location:true,
        device:true,
        user:true,
        department:true,
      }
    })
    return employee
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
    const employee = await this.employeeRepository.findOne({
      where:{employeeId: id},
      relations:['user']
    })
    if(!employee)throw new NotFoundException()

    if(employee.user){
      await this.userRepository.delete(employee.user.userId)
    }

    return await this.employeeRepository.delete(id)
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
