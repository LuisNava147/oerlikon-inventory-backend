import { IsString, IsNotEmpty, IsOptional, IsNumber,MaxLength, MinLength, IsInt } from 'class-validator';
import { Device } from 'src/devices/entities/device.entity';
import { Location } from 'src/locations/entities/location.entity';

export class CreateDeparmentDto {
    @IsString()
    @MaxLength(180)
    departmentName: string

    @IsString()
    @IsOptional()
    location?: Location
}
