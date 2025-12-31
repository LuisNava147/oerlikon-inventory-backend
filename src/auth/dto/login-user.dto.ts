import { IsString,MaxLength,IsEmail,IsOptional,MinLength } from "class-validator";
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export class LoginUserDto{
    @ApiProperty({
        name: "firtsname.lastname@oerlikon.com"
    })
    @IsString()
    @IsEmail()
    userEmail: string

    @IsString()
    @MinLength(8)
    userPassword: string
}