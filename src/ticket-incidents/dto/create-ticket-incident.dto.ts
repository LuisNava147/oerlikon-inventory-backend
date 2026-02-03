import { IsString, IsNotEmpty, IsOptional, IsNumber,MaxLength, MinLength, IsInt, IsUUID, IsDateString } from 'class-validator';

export class CreateTicketIncidentDto {
    @IsString()
    @MaxLength(160)
    ticketName: string
    @IsDateString()
    @IsOptional()
    ticketDateClose?: Date
    @IsString()
    @MaxLength(500)
    ticketLink: string
    @IsString()
    @IsOptional()
    status?: string
    @IsString()
    @MaxLength(350)
    ticketDescription: string
}
