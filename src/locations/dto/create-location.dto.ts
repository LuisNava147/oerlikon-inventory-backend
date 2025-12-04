import { IsString, IsNotEmpty, IsOptional, IsNumber,MaxLength, MinLength } from 'class-validator';

export class CreateLocationDto {
    @IsString()
    @MaxLength(30)
    locationName: string

    @IsString()
    @MaxLength(200)
    locationAddress: string

}
