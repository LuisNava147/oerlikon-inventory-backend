import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';

@ApiAuth()
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Auth(ROLES.ADMIN)
  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @Auth(ROLES.ADMIN)
  @Get()
  findAll() {
    return this.providersService.findAll();
  }

  @Auth(ROLES.ADMIN)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    console.log(this.providersService.findOne(id))
    return this.providersService.findOne(id);
  }

  @Auth(ROLES.ADMIN)
  @Get(':name')
  findByName(@Param('name', ParseUUIDPipe) name: string) {
    return this.providersService.findByName(name);
  }

  @Auth(ROLES.ADMIN)
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(id, updateProviderDto);
  }

  @Auth(ROLES.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.providersService.remove(id);
  }
}
