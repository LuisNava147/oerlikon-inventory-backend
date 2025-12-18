import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto);
  }

  @Get()
  findAll() {
    return this.devicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.devicesService.findOne(id);
  }

  @Get('/location/:id')
  findByLocation(@Param('id')id:number){
    return this.devicesService.findByLocation(id);
  }

  @Get('/employee/:id')
  findByEmployee(@Param('id', ParseUUIDPipe)id:string){
    return this.devicesService.findByEmployee(id);
  }

  @Get('/asset-number/:assetNumber')
  findByAssetNumber(@Param('assetNumber') assetNumber: string){
    return this.devicesService.findByAssetNumber(assetNumber);
  }

  @Get('/hostname/:hostName')
  findByHostName(@Param('hostName') hostName: string){
    return this.devicesService.findByHostName(hostName);
  }

  @Get('/ip-address/:ip')
  findByIP(@Param('ip') ip: string){
    return this.devicesService.findByIP(ip);
  }

  @Get('/type/:type')
  findByType(@Param('type') type: string){
    return this.devicesService.findByType(type);
  }

  @Get('/brand/:brand')
  findByBrand(@Param('brand') brand: string){
    return this.devicesService.findByBrand(brand);
  }

  @Get('/employee-name/:name')
  findByEmployeeName(@Param('name')name:string){
    return this.devicesService.findByEmployeeName(name);
  }

  @Get('/department/:depart')
  findByDepartment(@Param('depart')depart:string){
    return this.devicesService.findByDepartment(depart);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.devicesService.update(id, updateDeviceDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.devicesService.remove(id);
  }
}
