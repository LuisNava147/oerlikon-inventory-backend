import { Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Device } from 'src/devices/entities/device.entity';
import { AssignmentDevice } from './entities/assignment-device.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Assignment, Device, AssignmentDevice, Employee])],
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
})
export class AssignmentsModule {}
