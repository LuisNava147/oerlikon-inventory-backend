import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Employee])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
