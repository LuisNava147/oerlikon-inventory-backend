import { Location } from 'src/locations/entities/location.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber,MaxLength, MinLength, IsInt, IsUUID } from 'class-validator';

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
    @MaxLength(16)
    employeePhoneNumber: string

    @ApiProperty({
        default: "name.lastname@oerlikon.com"
    })
    @IsString()
    employeeEmail: string

    @IsString()
    location: Location

    
}
