import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, ConflictException  } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';
import { Repository } from 'typeorm';
import { Like } from 'typeorm';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceReposirory: Repository<Device>,
  ){}
  async create(createDeviceDto: CreateDeviceDto) {
    try{
      const device = this.deviceReposirory.create(createDeviceDto)
        return await this.deviceReposirory.save(device)
    }catch(error){
      throw this.duplicateDBKeyError(error)
    }
  }

  findAll() {
    return this.deviceReposirory.find({
      relations:{
        location:true,
        department:true,
        employee: true,
      }
    });
  }

  findByLocation(id: number){
    const location= this.deviceReposirory.findBy({
      location:{
        locationId: id
      }
    })
    return location;
  }

  async findOne(id: string) {
    const device = await this.deviceReposirory.findOne({
      where:{
        deviceId: id
      },
      relations:{
        location: true,
        department: true,
        employee: true,
      }
    })
    if(!device)throw new NotFoundException("Dispositivo no encontrado")
    return device;
  }

  async findByEmployee(id: string){
    const employee= await this.deviceReposirory.findBy({
        employee:{
          employeeId:id
      }
    })
    return employee;
  }

  findByHostName(hostName: string){
    const device = this.deviceReposirory.findBy({
      deviceHostName: Like(`%${hostName}%`)
    })
    return device;
  }

  async findByAssetNumber(assetNumber: string){
    const device = await this.deviceReposirory.findBy({
      deviceAssetNumber: Like(`%${assetNumber}%`)
    })
    if(device.length === 0)throw new NotFoundException("no. activo no encontrado");
    return device;
  }

  findByIP(ip: string){
    const device = this.deviceReposirory.findBy({
      ipAddress: Like(`%${ip}%`)
    })
    return device;
  }

  findByType(type: string){
    const device = this.deviceReposirory.findBy({
      deviceType: Like(`%${type}%`)
    })
    return device;
  }

  findByBrand(brand: string){
    const device = this.deviceReposirory.findBy({
      deviceBrand: Like(`%${brand}%`)
    })
    return device;
  }

  async findByEmployeeName(name: string){
    const employee = await this.deviceReposirory.find({
      where:[{
        employee: {employeeName: Like(`%${name}`)}
      },{
        employee: {employeeLastName: Like(`%${name}`)}
      }
    ],
    relations: {
      employee: true,
      location: true,
    }
    })
    return employee;
  }

  findByDepartment(depart: string){
    const device = this.deviceReposirory.find({
      where:{
        department: Like(`%${depart}$`)
      },
      relations:{
        location: true,
      }
    })
    return device;
  }

  async update(id: string, updateDeviceDto: UpdateDeviceDto) {
    try{
      const device = await this.deviceReposirory.preload({
        deviceId: id,
        ...updateDeviceDto,
      })
      if(!device)throw new NotFoundException("No se puede actualizar el dispositivo")
      return await this.deviceReposirory.save(device);
    }catch(error){
      throw this.handleDBError(error);
    }
  }

  async remove(id: string) {
    await this.findOne(id)
    await this.deviceReposirory.delete(id)
    return {
      message: "Dispositivo eliminado"
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
