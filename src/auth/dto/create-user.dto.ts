import { IsString,MaxLength,IsEmail,IsOptional,MinLength, IsUUID, IsIn } from "class-validator";
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import { Employee } from "src/employees/entities/employee.entity";

export class CreateUserDto {
@IsUUID()
employee:Employee

@ApiProperty({default: "firstname.lastname@oerlikon.com"})
@IsEmail()
@IsString()
userEmail: string

@IsString()
@MinLength(8)
userPassword: string

@IsOptional()
@IsIn(["Admin"])
userRoles: string[]
}
