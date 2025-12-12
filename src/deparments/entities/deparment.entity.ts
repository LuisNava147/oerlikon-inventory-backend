import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Device } from "src/devices/entities/device.entity";

@Entity()
export class Deparment {
@PrimaryGeneratedColumn("uuid")
departmentId: string
@Column("text")
departmentName: string

@OneToMany(()=> Device, (device)=> device.department)
    device: Device[]
}
