import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository : Repository<User>,
    @InjectRepository(Employee)
    private readonly employeeRepository : Repository<Employee>,
    private readonly jwtService: JwtService,
  ){}

  async registerUser(id: string, createUserDto: CreateUserDto){
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5)
    const employee = await this.employeeRepository.findOneBy({
      employeeId: id
    })
    if(!employee)throw new NotFoundException("empleado no encontrado");
    const user = await this.userRepository.save(createUserDto);
    if(!user)throw new NotFoundException("No es posible crear el usuario para este empleado")
    return user;
  }

  async loginUser(loginUserDto: LoginUserDto){
    const user = await this.userRepository.findOne({
      where:{
        userEmail: loginUserDto.userEmail,
      },
    });
    if(!user)throw new UnauthorizedException("Usuario no encontrado")
    const match = await bcrypt.compare(loginUserDto.userPassword, user.userPassword);
    if(!match)throw new UnauthorizedException("Usuario no encontrado")
    const payload = {
  userEmail: user.userEmail,
  userPassword: user.userPassword,
  userRoles: user.userRoles
    };
  const token = this.jwtService.sign(payload);
  return token;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto){
    if(updateUserDto.userPassword){
      updateUserDto.userPassword = bcrypt.hashSync(updateUserDto.userPassword, 5);
    }
    const newUserData = await this.userRepository.preload({
      userId: id,
      ...updateUserDto
    })
    if(!newUserData)throw new NotFoundException("No es posible actualizar el usuario")
    return newUserData;
  }
  }
 

