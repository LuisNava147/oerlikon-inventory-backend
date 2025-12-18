import { Location } from 'src/locations/entities/location.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber,MaxLength, MinLength, IsInt, IsUUID } from 'class-validator';

export class CreateProviderDto {
@IsString()
@MaxLength(80)
@IsNotEmpty()
providerName: string

@IsString()
@IsOptional()
providerEmail: string

@IsString()
@IsOptional()
@MaxLength(16)
providerPhoneNumber: string

@IsString()
@MaxLength(180)
providerContactName: string   

@IsString()
location: Location

}
