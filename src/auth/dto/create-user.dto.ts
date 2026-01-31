import { IsString,MaxLength,IsEmail,IsOptional,MinLength, IsUUID, IsIn } from "class-validator";
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import { Employee } from "src/employees/entities/employee.entity";

export class CreateUserDto {

@ApiProperty({default: "firstname.lastname@oerlikon.com"})
@IsEmail()
@IsString()
userEmail: string

@IsString()
@MinLength(8)
userPassword: string

@IsUUID()
employee: Employee 

@IsOptional()
@IsIn(["Admin"])
userRoles: string[]
}
