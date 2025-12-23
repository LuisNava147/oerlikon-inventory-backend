import { Module } from '@nestjs/common';
import { AccessRequestsService } from './access-requests.service';
import { AccessRequestsController } from './access-requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessRequest } from './entities/access-request.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AccessRequest])],
  controllers: [AccessRequestsController],
  providers: [AccessRequestsService],
})
export class AccessRequestsModule {}
