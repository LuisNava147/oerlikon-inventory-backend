import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Res } from '@nestjs/common';
import { AccessRequestsService } from './access-requests.service';
import { CreateAccessRequestDto } from './dto/create-access-request.dto';
import { UpdateAccessRequestDto } from './dto/update-access-request.dto';
import type { Response } from 'express';

@Controller('access-requests')
export class AccessRequestsController {
  constructor(private readonly accessRequestsService: AccessRequestsService) {}

  @Post()
  create(@Body() createAccessRequestDto: CreateAccessRequestDto) {
    return this.accessRequestsService.create(createAccessRequestDto);
  }

  @Get()
  findAll() {
    return this.accessRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseUUIDPipe) id: string) {
    return this.accessRequestsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',ParseUUIDPipe) id: string, @Body() updateAccessRequestDto: UpdateAccessRequestDto) {
    return this.accessRequestsService.update(id, updateAccessRequestDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.accessRequestsService.remove(id);
  }
}
