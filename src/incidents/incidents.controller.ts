import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';

@ApiAuth()
@Controller('incidents')
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Auth(ROLES.ADMIN)
  @Post()
  create(@Body() createIncidentDto: CreateIncidentDto) {
    return this.incidentsService.create(createIncidentDto);
  }

  @Auth(ROLES.ADMIN)
  @Get()
  findAll() {
    return this.incidentsService.findAll();
  }

  @Auth(ROLES.ADMIN)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.incidentsService.findOne(id);
  }

  @Auth(ROLES.ADMIN)
  @Get('/report-number/:name')
  findByReportNumber(@Param('name') name: string) {
    return this.incidentsService.findByReportNumber(name);
  }

  @Auth(ROLES.ADMIN)
  @Get('/department-name/:name')
  findByDepartmentName(@Param('name') name: string) {
    return this.incidentsService.findByDepartmentName(name);
  }

  @Auth(ROLES.ADMIN)
  @Get('/device-name/:name')
  findByDeviceName(@Param('name') name: string) {
    return this.incidentsService.findByDeviceName(name);
  }

  @Auth(ROLES.ADMIN)
  @Get('/location-name/:name')
  findByLocationName(@Param('name') name: string) {
    return this.incidentsService.findByLocationName(name);
  }

  @Auth(ROLES.ADMIN)
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateIncidentDto: UpdateIncidentDto) {
    return this.incidentsService.update(id, updateIncidentDto);
  }

  @Auth(ROLES.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.incidentsService.remove(id);
  }
}
