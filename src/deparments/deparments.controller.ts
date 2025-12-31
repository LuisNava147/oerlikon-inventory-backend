import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeparmentsService } from './deparments.service';
import { CreateDeparmentDto } from './dto/create-deparment.dto';
import { UpdateDeparmentDto } from './dto/update-deparment.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';

@ApiAuth()
@Controller('departments')
export class DeparmentsController {
  constructor(private readonly deparmentsService: DeparmentsService) {}

  @Auth(ROLES.ADMIN)
  @Post()
  create(@Body() createDeparmentDto: CreateDeparmentDto) {
    return this.deparmentsService.create(createDeparmentDto);
  }

  @Auth(ROLES.ADMIN)
  @Get()
  findAll() {
    return this.deparmentsService.findAll();
  }

  @Auth(ROLES.ADMIN)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.deparmentsService.findOne(id);
  }

  @Auth(ROLES.ADMIN)
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDeparmentDto: UpdateDeparmentDto) {
    return this.deparmentsService.update(id, updateDeparmentDto);
  }

  @Auth(ROLES.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.deparmentsService.remove(id);
  }
}
