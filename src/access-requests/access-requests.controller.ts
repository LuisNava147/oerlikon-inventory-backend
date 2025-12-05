import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccessRequestsService } from './access-requests.service';
import { CreateAccessRequestDto } from './dto/create-access-request.dto';
import { UpdateAccessRequestDto } from './dto/update-access-request.dto';

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
  findOne(@Param('id') id: string) {
    return this.accessRequestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccessRequestDto: UpdateAccessRequestDto) {
    return this.accessRequestsService.update(+id, updateAccessRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accessRequestsService.remove(+id);
  }
}
