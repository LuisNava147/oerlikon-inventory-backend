import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeparmentsService } from './deparments.service';
import { CreateDeparmentDto } from './dto/create-deparment.dto';
import { UpdateDeparmentDto } from './dto/update-deparment.dto';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('departments')
export class DeparmentsController {
  constructor(private readonly deparmentsService: DeparmentsService) {}

  @Post()
  create(@Body() createDeparmentDto: CreateDeparmentDto) {
    return this.deparmentsService.create(createDeparmentDto);
  }

  @Get()
  findAll() {
    return this.deparmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.deparmentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDeparmentDto: UpdateDeparmentDto) {
    return this.deparmentsService.update(id, updateDeparmentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.deparmentsService.remove(id);
  }
}
