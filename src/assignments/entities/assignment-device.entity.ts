import {
    Entity,
    ManyToOne,
    JoinColumn,
    PrimaryColumn,
  } from 'typeorm'
  import { Assignment } from './assignment.entity'
  import { Device } from 'src/devices/entities/device.entity'
import { PrimaryGeneratedColumn } from 'typeorm'
  
  @Entity('assignment_devices')
  export class AssignmentDevice {
  
    @PrimaryGeneratedColumn('uuid')
    assignmentDeviceId: string
  
    @ManyToOne(
      () => Assignment,
      assignment => assignment.assignmentDevice,
      { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'assignmentId' })
    assignment: Assignment
  
    @ManyToOne(
      () => Device,
      device => device.assignments,
      { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'deviceId' })
    device: Device
  }
  