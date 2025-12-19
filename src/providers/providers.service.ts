import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>
  ){}
  async create(createProviderDto: CreateProviderDto) {
    try{
      const provider = this.providerRepository.create(createProviderDto)
      return await this.providerRepository.save(provider)
    }catch(error){
      throw this.duplicateDBKeyError(error);
    }
  }

  findAll() {
    return this.providerRepository.find({
      relations:{
        location:true,
      }
    });
  }

  findByName(name:string){
    const provider = this.providerRepository.findBy({
      providerName: Like(`%${name}%`)
    })
    return provider;
  }

  findOne(id: string) {
    const provider = this.providerRepository.findOne({
      where:{
        providerId: id
      },
      relations:{
        location: true,
      }
    })
    return provider;
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    try{
      const provider = await this.providerRepository.preload({
        providerId: id,
        ...updateProviderDto
      })
      if(!provider)throw new NotFoundException("No se puede actualizar el proveedor")
      return await this.providerRepository.save(provider);
    }catch(error){
      throw this.handleDBError(error);
    }
  }

  async remove(id: string) {
   await this.providerRepository.delete(id)
   return {
    message: "Proveedor eliminado"
   }
  }

  private handleDBError(error:any):never{
    if(error.code == '23505'){
      throw new BadRequestException("Bad Request")
    }
    throw new InternalServerErrorException("Error interno al actualizar el proveedor")
  }

  private duplicateDBKeyError(error:any):never{
    if(error.code == '23505'){
      throw new ConflictException("Uno de estos o los dos valores ya está registrado: 'Correo'y/o'numero")
    }
    throw new InternalServerErrorException("Error interno al crear el proveedor")
  }
}
