import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Res } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import type { Response } from 'express';
import { Employee } from 'src/employees/entities/employee.entity';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post()
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentsService.create(createAssignmentDto);
  }

  @Get()
  findAll() {
    return this.assignmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.assignmentsService.findOne(id);
  }

  @Get(':id/pdf')
  async downloadPdf(@Param('id',ParseUUIDPipe) id: string, 
  @Res() res: Response,
  ){
    const pdfBuffer = await this.assignmentsService.generatePdf(id)
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': pdfBuffer.buffer.length.toString(),

      'Cache-Control':'no-cache, no-store, must-revalidate',
      'Pragma':'no-cache',
      'Expires':0,
    });
    res.attachment(pdfBuffer.fileName);
    res.send(pdfBuffer.buffer);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateAssignmentDto: UpdateAssignmentDto) {
    return this.assignmentsService.update(id, updateAssignmentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.assignmentsService.remove(id);
  
  }
}
