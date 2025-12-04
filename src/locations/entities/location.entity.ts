import { Employee } from "src/employees/entities/employee.entity";
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
}
