import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import * as puppeteer from 'puppeteer';
import { generateResponsivaHTML } from 'src/pdf-template';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepository : Repository<Assignment>,
  ){}
  async create(createAssignmentDto: CreateAssignmentDto) {
    try{
      const assignment = this.assignmentRepository.create(createAssignmentDto)
      return await this.assignmentRepository.save(assignment);
    }catch(error){
      this.handleDBError(error);
    }
  }

  findAll() {
    return this.assignmentRepository.find({
      relations:{
        employee: true,
        device: true,
      }
    })
  }

  async findOne(id: string) {
    const assignment = await this.assignmentRepository.findOne({
      where:{
        assignmentId: id,
      },
      relations:{
        employee: true,
        device: true,
      }
    })
    if(!assignment)throw new NotFoundException("Responsiva no encontrada");
    return assignment;
  }

  update(id: string, updateAssignmentDto: UpdateAssignmentDto) {
    return `This action updates a #${id} assignment`;
  }

  async remove(id: string) {
    await this.assignmentRepository.delete(id)
    return{
      message: "Responsiva eliminada"
    }
  }

  async generatePdf(assignmentId: string): Promise<Buffer>{
    const currentAssignment = await this.findOne(assignmentId)
    const employeeId = currentAssignment.employee.employeeId;
    const allActiveAssignments = await this.assignmentRepository.find({
      where:{
        employee:{
          employeeId: employeeId
        },
        assigmentStatus: 'Activo'
      },
      relations:{
        employee: true,
        device: true,
      }
    });
    if(allActiveAssignments.length === 0){
      throw new NotFoundException("Este empleado no tiene activos asignados actualmente")
  }
  const htmlContent = generateResponsivaHTML(allActiveAssignments);
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage()
  await page.setContent(htmlContent, {waitUntil: 'networkidle0'});

  const pdfBuffer = await page.pdf({
    format: 'Letter',
    printBackground: true,
    margin: {top: '30px', bottom: '30px', left: '20px', right: '20px'}
  });
  await browser.close();
  return Buffer.from(pdfBuffer);
  }

  private handleDBError(error:any):never{
    if(error.code == '23505'){
      throw new BadRequestException("Bad Request")
    }
    throw new InternalServerErrorException("Error interno al actualizar la responsiva")
  }
}
