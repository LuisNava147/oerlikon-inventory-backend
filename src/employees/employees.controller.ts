import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';

@ApiAuth()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Auth(ROLES.ADMIN)
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    //console.log(createEmployeeDto) 
    return this.employeesService.create(createEmployeeDto);
  }

  @Auth(ROLES.ADMIN)
  @Get()
  findAll() { 
    return this.employeesService.findAll();
  }

  @Auth(ROLES.ADMIN)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.employeesService.findOne(id);
  }

  @Auth(ROLES.ADMIN)
  @Get('/location/:id')
  findByLocation(@Param('id')id:string){
    return this.employeesService.findByLocation(+id);
  }

  @Auth(ROLES.ADMIN)
  @Get('/location-name/:name')
  findByLocationName(@Param('name')name:string){
    return this.employeesService.findByLocationName(name);
  }

  @Auth(ROLES.ADMIN)
  @Get('/employee-name/:name')
  findByEmployeeName(@Param('name')name:string){
    return this.employeesService.findByEmployeeName(name);
  }

  @Auth(ROLES.ADMIN)
  @Get('/employee-email/:email')
  findByEmployeeEmail(@Param('email')email:string){
    return this.employeesService.findByEmployeeEmail(email);
  }

  @Auth(ROLES.ADMIN)
  @Get('/employee-phone/:phone')
  findByEmployeePhoneNumber(@Param('phone')phone:string){
    return this.employeesService.findByEmployeePhoneNumber(phone);
  }

  @Auth(ROLES.ADMIN)
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Auth(ROLES.ADMIN)
  @Delete(':id')
  remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.employeesService.remove(id);
  }
}
