import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber,MaxLength, MinLength, IsInt, IsUUID, IsDateString } from 'class-validator';
import { Device } from 'src/devices/entities/device.entity';
import { Employee } from 'src/employees/entities/employee.entity';

export class CreateAssignmentDto {
    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({name:"YYYY-MM-DD"})
    assignmentDate: Date

    @IsDateString()
    @IsOptional()
    @ApiProperty({name:"YYYY-MM-DD"})
    assignmentReturnDate?: Date

    @IsString()
    assigmentStatus: string

    @IsString()
    @IsOptional()
    responsivaUrl?: string;

    @IsUUID()
    employee: Employee

    @IsUUID()
    device: Device

}
