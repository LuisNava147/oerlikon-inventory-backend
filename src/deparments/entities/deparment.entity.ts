import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Device } from "src/devices/entities/device.entity";
import { Incident } from "src/incidents/entities/incident.entity";
import { Employee } from "src/employees/entities/employee.entity";
import { Location } from "src/locations/entities/location.entity";
import { JoinColumn } from "typeorm";

@Entity()
export class Deparment {
@PrimaryGeneratedColumn("uuid")
departmentId: string
@Column("text")
departmentName: string

@OneToMany(()=> Device, (device)=> device.department)
    device: Device[]

@OneToMany(()=> Incident, (incident)=> incident.department)
    incident: Incident[]

@OneToMany(()=> Employee, (employee)=> employee.department)
    employee: Employee[]

@ManyToOne(()=> Location, (location)=> location.department, {nullable:true, onDelete:'SET NULL'})
@JoinColumn({name: "locationId"})
    location: Location
}
