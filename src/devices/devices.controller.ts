import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';

@ApiAuth()
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Auth(ROLES.ADMIN)
  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto);
  }

  @Auth(ROLES.ADMIN)
  @Get()
  findAll() {
    return this.devicesService.findAll();
  }

  @Auth(ROLES.ADMIN)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.devicesService.findOne(id);
  }

  @Auth(ROLES.ADMIN)
  @Get('/location/:id')
  findByLocation(@Param('id')id:number){
    return this.devicesService.findByLocation(id);
  }

  @Auth(ROLES.ADMIN)
  @Get('/employee/:id')
  findByEmployee(@Param('id', ParseUUIDPipe)id:string){
    return this.devicesService.findByEmployee(id);
  }

  @Auth(ROLES.ADMIN)
  @Get('/asset-number/:assetNumber')
  findByAssetNumber(@Param('assetNumber') assetNumber: string){
    return this.devicesService.findByAssetNumber(assetNumber);
  }

  @Auth(ROLES.ADMIN)
  @Get('/hostname/:hostName')
  findByHostName(@Param('hostName') hostName: string){
    return this.devicesService.findByHostName(hostName);
  }

  @Auth(ROLES.ADMIN)
  @Get('/ip-address/:ip')
  findByIP(@Param('ip') ip: string){
    return this.devicesService.findByIP(ip);
  }

  @Auth(ROLES.ADMIN)
  @Get('/type/:type')
  findByType(@Param('type') type: string){
    return this.devicesService.findByType(type);
  }

  @Auth(ROLES.ADMIN)
  @Get('/brand/:brand')
  findByBrand(@Param('brand') brand: string){
    return this.devicesService.findByBrand(brand);
  }

  @Auth(ROLES.ADMIN)
  @Get('/employee-name/:name')
  findByEmployeeName(@Param('name')name:string){
    return this.devicesService.findByEmployeeName(name);
  }

  @Auth(ROLES.ADMIN)
  @Get('/employee-phone-number/:phone')
  findByEmployeePhoneNumber(@Param('phone')phone:string){
    return this.devicesService.findByEmployeePhoneNumber(phone);
  }

  @Auth(ROLES.ADMIN)
  @Get('/mobile-account/:account')
  findByEmployeePhoneAccount(@Param('account')account:string){
    return this.devicesService.findByPhoneAccount(account);
  }

  @Auth(ROLES.ADMIN)
  @Get('/location-name/:name')
  findByLocationName(@Param('name')name:string){
    return this.devicesService.findByLocationName(name);
  }

  @Auth(ROLES.ADMIN)
  @Get('/department/:depart')
  findByDepartment(@Param('depart')depart:string){
    return this.devicesService.findByDepartmentName(depart);
  }

  @Auth(ROLES.ADMIN)
  @Get('/sap-name/:name')
  findBySapName(@Param('name')name:string){
    return this.devicesService.findBySapName(name);
  }

  @Auth(ROLES.ADMIN)
  @Get('/model/:model')
  findByDeviceModel(@Param('model')model:string){
    return this.devicesService.findByDeviceModel(model);
  }

  @Auth(ROLES.ADMIN)
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.devicesService.update(id, updateDeviceDto);
  }

  @Auth(ROLES.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.devicesService.remove(id);
  }
}
