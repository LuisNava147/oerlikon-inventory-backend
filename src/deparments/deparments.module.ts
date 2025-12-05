import { Module } from '@nestjs/common';
import { DeparmentsService } from './deparments.service';
import { DeparmentsController } from './deparments.controller';

@Module({
  controllers: [DeparmentsController],
  providers: [DeparmentsService],
})
export class DeparmentsModule {}
