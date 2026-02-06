import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from "@nestjs/config";
import { LocationsModule } from './locations/locations.module';
import { DevicesModule } from './devices/devices.module';
import { AccessRequestsModule } from './access-requests/access-requests.module';
import { IncidentsModule } from './incidents/incidents.module';
import { TicketIncidentsModule } from './ticket-incidents/ticket-incidents.module';
import { DeparmentsModule } from './deparments/deparments.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ 
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: "postgres",
      host: process.env.host,
      port: 5434,
      username: "postgres",
      password: process.env.pass,
      database: process.env.name,
      entities:[],
      autoLoadEntities: true,
      synchronize: true,
  }), EmployeesModule, 
      LocationsModule, 
      DevicesModule,  
      AccessRequestsModule, 
      IncidentsModule, 
      TicketIncidentsModule, 
      DeparmentsModule, 
      AssignmentsModule, 
      AuthModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
