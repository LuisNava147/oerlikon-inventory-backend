import { Location } from 'src/locations/entities/location.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber,MaxLength, MinLength, IsInt, IsUUID, IsEmail } from 'class-validator';
import { Deparment } from 'src/deparments/entities/deparment.entity';

export class CreateEmployeeDto {
    @IsString()
    @MaxLength(20)
    @MinLength(3)
    employeeName: string

    @IsString()
    @MaxLength(70)
    @MinLength(3)
    employeeLastName: string 
    
    @IsString()
    @IsOptional()
    @MaxLength(16)
    employeePhoneNumber: string

    @ApiProperty({
        default: "firtsname.lastname@oerlikon.com"
    })
    @IsString()
    @IsEmail()
    employeeEmail: string

    @IsString()
    @IsOptional()
    location: Location

    @IsUUID()
    @IsOptional()
    department?: Deparment

    
}
