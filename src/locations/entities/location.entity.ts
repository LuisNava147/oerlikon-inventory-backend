import { Device } from "src/devices/entities/device.entity";
import { Employee } from "src/employees/entities/employee.entity";
import { Provider } from "src/providers/entities/provider.entity";
import {Entity, Column, PrimaryGeneratedColumn }from "typeorm";
import { ManyToOne, OneToMany } from "typeorm";
import { JoinColumn } from "typeorm";
import { OneToOne } from "typeorm";

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationId: number
    @Column("text",{unique:true})
    locationName: string
    @Column("text",{nullable:true})
    locationAddress: string

    @OneToMany(()=> Employee, (employee)=> employee.location)
    employee: Employee[]

    @OneToMany(()=> Device, (device)=> device.location)
    device: Device[]

    @OneToMany(()=> Provider, (provider)=> provider.location)
    provider: Provider[]
}
