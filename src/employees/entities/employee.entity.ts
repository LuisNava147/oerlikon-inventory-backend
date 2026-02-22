import { User } from "src/auth/entities/user.entity";
import { Deparment } from "src/deparments/entities/deparment.entity";
import { Device } from "src/devices/entities/device.entity";
import { Location } from "src/locations/entities/location.entity";
import {Entity, Column, PrimaryGeneratedColumn }from "typeorm";
import { ManyToOne } from "typeorm";
import { JoinColumn } from "typeorm";
import { OneToOne } from "typeorm";
import { OneToMany } from "typeorm";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn("uuid")
    employeeId: string
    @Column({type:"text"})
    employeeName: string
    @Column({type:"text"})
    employeeLastName: string 
    @Column("text",{unique:true, nullable:true},)
    employeePhoneNumber: string
    @Column("text",{unique:true})
    employeeEmail: string
    
    @ManyToOne(()=> Location, (location)=> location.employee,{onDelete:'SET NULL', nullable:true})
    @JoinColumn({
        name:"LocationId",
    })
    location: Location | string

    @OneToMany(()=> Device, (device)=> device.employee, {onDelete:'SET NULL', nullable:true})
    device: Device[]
    @OneToOne(()=> User, (user)=> user.employee)
    user: User

    @ManyToOne(()=> Deparment, (department)=> department.employee, {onDelete:'SET NULL', nullable:true})
    @JoinColumn({
        name: "departmentId"
    })
    department: Deparment
    
}
