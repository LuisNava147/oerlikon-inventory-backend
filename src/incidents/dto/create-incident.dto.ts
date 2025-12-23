import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber,MaxLength, MinLength, IsInt, IsUUID, IsDateString } from 'class-validator';
import { Deparment } from 'src/deparments/entities/deparment.entity';
import { Device } from 'src/devices/entities/device.entity';
import { Provider } from 'src/providers/entities/provider.entity';

export class CreateIncidentDto {
    @IsString()
    reportNumber: string
    @IsString()
    @IsOptional()
    status?: string
    @IsString()
    @MaxLength(350)
    incidentDescription: string
    @IsString()
    @IsOptional()
    @MaxLength(350)
    incidentNote?: string
    @IsDateString()
    @IsOptional()
    incidentDateClose?:  Date
    @IsUUID()
    @IsOptional()
    department?: Deparment
    @IsUUID()
    @IsOptional()
    device?: Device


}
