import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber,MaxLength, MinLength, IsInt, IsUUID, IsDateString, Max } from 'class-validator';
import { Location } from 'src/locations/entities/location.entity';
import { Provider } from 'src/providers/entities/provider.entity';

export class CreateAccessRequestDto {
    @IsString()
    @MaxLength(100)
    applicantFullName: string

    @IsString()
    @MaxLength(260)
    visitorName: string

    @IsString()
    @MaxLength(360)
    accessReason: string

    @IsDateString()
    @ApiProperty({name:"YYYY-MM-DD"})
    accessDate: Date

    @IsString()
    accessHour: string

    @IsString()
    accessDuration: string

    @IsString()
    @IsOptional()
    accessUrl?: string

    @IsUUID()
    provider: Provider

    @IsString()
    location: Location

}
