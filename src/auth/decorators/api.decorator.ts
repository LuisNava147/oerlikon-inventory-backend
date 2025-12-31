import { applyDecorators } from "@nestjs/common";
import {ApiProperty, ApiPropertyOptional, ApiResponse} from '@nestjs/swagger';

export const ApiAuth=(()=>{
    return applyDecorators(
        ApiResponse({
            status:401,
            description: "Missing or Invalid Token"
        }),
        ApiResponse({
            status: 403,
            description: "Missing Rol"
        }),
        ApiResponse({
            status:500,
            description: "Internal Server Error"
        })
    )
})