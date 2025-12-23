import { Device } from "src/devices/entities/device.entity";
import { Employee } from "src/employees/entities/employee.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Assignment {
    @PrimaryGeneratedColumn('uuid')
    assignmentId: string
    @Column({type:"date"})
    assignmentDate: Date
    @Column({type: "date",nullable:true})
    assignmentReturnDate: Date
    @Column("text")
    assigmentStatus: string
    @Column({nullable:true})
    responsivaUrl: string

    //relaciones
    @ManyToOne(()=> Employee, {nullable:false})
    @JoinColumn({
        name: "employeeId"
    })
    employee: Employee

    @ManyToOne(()=> Device,(device)=> device.assignment, {nullable:false})
    @JoinColumn({
        name: "deviceId"
    })
    device: Device
}
