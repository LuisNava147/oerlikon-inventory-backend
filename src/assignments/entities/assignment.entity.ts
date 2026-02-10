import { Device } from "src/devices/entities/device.entity";
import { Employee } from "src/employees/entities/employee.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OneToMany } from "typeorm";
import { AssignmentDevice } from "./assignment-device.entity";

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
    @Column("text",{nullable:true})
    folio: string

    //relaciones
    @ManyToOne(()=> Employee, {nullable:false})
    @JoinColumn({
        name: "employeeId"
    })
    employee: Employee

    @OneToMany(
        () => AssignmentDevice,
        assignmentDevice => assignmentDevice.assignment,
        { cascade: true }
      )
      assignmentDevice: AssignmentDevice[]
}
