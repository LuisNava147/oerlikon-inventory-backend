import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from "@nestjs/config";
import { LocationsModule } from './locations/locations.module';

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
  }), EmployeesModule, LocationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
