import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Repository } from 'typeorm';
import { Device } from 'src/devices/entities/device.entity';
import { v4 as uuidv4 } from 'uuid';
import { In } from 'typeorm';
import { AssignmentDevice } from './entities/assignment-device.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepository : Repository<Assignment>,
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
    @InjectRepository(AssignmentDevice)
    private readonly assignmentDeviceRepository: Repository<AssignmentDevice>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ){}

  async create(dto: CreateAssignmentDto) {
    const employee = await this.employeeRepository.findOne({
      where: { 
        employeeId: dto.employee
      },
    });
  
    if (!employee) {
      throw new NotFoundException('Empleado no encontrado');
    }
  
    const assignment = this.assignmentRepository.create({
      employee,
      assignmentDate: dto.assignmentDate,
      assigmentStatus: dto.assigmentStatus,
    });
  
    await this.assignmentRepository.save(assignment);
  
    // 🔥 AQUÍ conectamos los devices
    const assignmentDevices = dto.device.map(device =>
      this.assignmentDeviceRepository.create({
        assignment,
        device: {deviceId: device} as any
      }),
    );
  
    await this.assignmentDeviceRepository.save(assignmentDevices);
  
    return this.assignmentRepository.findOne({
      where: { assignmentId: assignment.assignmentId },
      relations: {
        employee: true,
        assignmentDevice: {
          device: true,
        },
      },
    });
  }
  

  findAll() {
    return this.assignmentRepository.find({
      relations:{
        employee: true,
        assignmentDevice: {
          device: true
        } 
      }
    })
  }

  async findOne(id: string) {
    const assignment = await this.assignmentRepository.findOne({
      where:{
        assignmentId: id,
      },
      relations:{
        employee: true,
        assignmentDevice: {
          device: true
        }
      }
    })
    if(!assignment)throw new NotFoundException("Responsiva no encontrada");
    return assignment;
  }

  update(id: string, updateAssignmentDto: UpdateAssignmentDto) {
    return `This action updates a #${id} assignment`;
  }

  async remove(id: string) {
    await this.assignmentRepository.delete(id)
    return{
      message: "Responsiva eliminada"
    }
  }


  private handleDBError(error:any):never{
    if(error.code == '23505'){
      throw new BadRequestException("Bad Request")
    }
    throw new InternalServerErrorException("Error interno al actualizar la responsiva")
  }
}
