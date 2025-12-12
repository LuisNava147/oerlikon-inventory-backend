import { Module } from '@nestjs/common';
import { DeparmentsService } from './deparments.service';
import { DeparmentsController } from './deparments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deparment } from './entities/deparment.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Deparment])
  ],
  controllers: [DeparmentsController],
  providers: [DeparmentsService],
})
export class DeparmentsModule {}
