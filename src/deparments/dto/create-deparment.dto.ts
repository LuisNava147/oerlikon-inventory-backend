import { IsString, IsNotEmpty, IsOptional, IsNumber,MaxLength, MinLength, IsInt } from 'class-validator';
import { Device } from 'src/devices/entities/device.entity';

export class CreateDeparmentDto {
    @IsString()
    @MaxLength(180)
    departmentName: string

    @IsOptional()
    @IsString()
    device: Device[]
}
