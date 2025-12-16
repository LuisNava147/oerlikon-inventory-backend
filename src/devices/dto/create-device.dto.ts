import { Location } from 'src/locations/entities/location.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber,MaxLength, MinLength, IsInt, IsUUID } from 'class-validator';
import { Deparment } from 'src/deparments/entities/deparment.entity';
import { Employee } from 'src/employees/entities/employee.entity';

export class CreateDeviceDto {
    @IsString()
    @MaxLength(35)
    @IsOptional()
    deviceHostName?: string

    @IsString()
    @MaxLength(30)
    @IsOptional()
    deviceAssetNumber?: string //BMX-0000

    @IsString()
    @MaxLength(60)
    @IsNotEmpty()
    deviceSerialTag: string

    @IsString()
    @IsNotEmpty()
    deviceModel: string

    @IsString()
    @IsNotEmpty()
    deviceBrand: string

    @IsString()
    @IsNotEmpty()
    deviceType: string

    @IsString()
    @IsOptional()
    deviceStatus?: string

    //opcionales
    @IsString()
    @IsOptional()
    devicePassword?:string

    @IsString()
    @IsOptional()
    devicePin?: string

    @IsString()
    @IsOptional()
    ipAddress?: string

    @IsString()
    @IsOptional()
    sapName?: string

    @IsString()
    @IsOptional()
    deviceMAC?: string

    //relaciones BD
    @IsString()
    @IsNotEmpty()
    location: Location

    @IsUUID()
    @IsOptional()
    department?: Deparment

    @IsUUID()
    @IsOptional()
    employee?: Employee

}
