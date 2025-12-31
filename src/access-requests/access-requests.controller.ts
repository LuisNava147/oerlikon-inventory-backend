import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Res } from '@nestjs/common';
import { AccessRequestsService } from './access-requests.service';
import { CreateAccessRequestDto } from './dto/create-access-request.dto';
import { UpdateAccessRequestDto } from './dto/update-access-request.dto';
import type { Response } from 'express';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';

@ApiAuth()
@Controller('access-requests')
export class AccessRequestsController {
  constructor(private readonly accessRequestsService: AccessRequestsService) {}

  @Auth(ROLES.ADMIN)
  @Post()
  create(@Body() createAccessRequestDto: CreateAccessRequestDto) {
    return this.accessRequestsService.create(createAccessRequestDto);
  }

  @Auth(ROLES.ADMIN)
  @Get()
  findAll() {
    return this.accessRequestsService.findAll();
  }

  @Auth(ROLES.ADMIN)
  @Get(':id')
  findOne(@Param('id',ParseUUIDPipe) id: string) {
    return this.accessRequestsService.findOne(id);
  }

  @Auth(ROLES.ADMIN)
  @Get(':id/pdf')
  async downloadPdf(@Param('id',ParseUUIDPipe) id: string,
  @Res() res : Response){
    const pdfBuffer = await this.accessRequestsService.generatePdf(id);

    res.set({
      'Content-Type':'application/pdf',
      'Content-Lenght':pdfBuffer.buffer.length.toString(),

      'Cache-Control':'no-cache, no-store, must-revalidate',
      'Pragma':'no-cache',
      'Expires':0,
    });
    res.attachment(pdfBuffer.fileName);
    res.send(pdfBuffer.buffer);
  }

  @Auth(ROLES.ADMIN)
  @Patch(':id')
  update(@Param('id',ParseUUIDPipe) id: string, @Body() updateAccessRequestDto: UpdateAccessRequestDto) {
    return this.accessRequestsService.update(id, updateAccessRequestDto);
  }

  @Auth(ROLES.ADMIN)
  @Delete(':id')
  remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.accessRequestsService.remove(id);
  }
}
