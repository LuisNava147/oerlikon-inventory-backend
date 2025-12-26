import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAccessRequestDto } from './dto/create-access-request.dto';
import { UpdateAccessRequestDto } from './dto/update-access-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessRequest } from './entities/access-request.entity';
import { Repository } from 'typeorm';
import { generateAccessRequestHtml } from 'src/utils/pdf-access-template';
import * as puppeteer from 'puppeteer';

@Injectable()
export class AccessRequestsService {
  constructor(
    @InjectRepository(AccessRequest)
    private readonly accessRepository: Repository<AccessRequest>,
  ){}
  async create(createAccessRequestDto: CreateAccessRequestDto) {
    try{
      const accessRequest = this.accessRepository.create(createAccessRequestDto)
      return await this.accessRepository.save(accessRequest);
    }catch(error){
      this.handleDBError(error)
    }
  }

  findAll() {
    return this.accessRepository.find({
      relations:{
        provider: true,
        location: true,
      }
    })
  }

  async findOne(id: string) {
    const accessRequest = await this.accessRepository.findOne({
      where:{
        accessId: id
      },
      relations:{
        provider: true,
        location: true,
      }
    })
    if(!accessRequest)throw new NotFoundException("Acceso no encontrado")
    return accessRequest;
  }

  update(id: string, updateAccessRequestDto: UpdateAccessRequestDto) {
    return `This action updates a #${id} accessRequest`;
  }

  async remove(id: string) {
    return await this.accessRepository.delete(id);
  }

  async generatePdf(id: string): Promise<{buffer: Buffer; fileName: string}>{
    const request = await this.findOne(id);
    const htmlContent = generateAccessRequestHtml(request);

    const browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
    const page = await browser.newPage();
    await page.setContent(htmlContent, {waitUntil: 'networkidle0'});

    const pdfBuffer = await page.pdf({
      format: 'Letter',
      printBackground: true,
      margin: {top: '30px', bottom: '30px', left: '30px', right: '30px'},
    });
    await browser.close();

    const safeName = `${request.provider.providerName.trim()}_${request.accessDate}`.replace(/\s+/g,'_')
    
    return{
      buffer: Buffer.from(pdfBuffer),
      fileName: `Acceso_Proveedor_${safeName}.pdf`
    }

  }

  private handleDBError(error:any):never{
    if(error.code == '23505'){
      throw new BadRequestException("Bad Request")
    }
    throw new InternalServerErrorException("Error interno al actualizar el acceso")
  }
}
