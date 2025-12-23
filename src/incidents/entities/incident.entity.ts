import { Deparment } from "src/deparments/entities/deparment.entity";
import { Device } from "src/devices/entities/device.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Incident {
    @PrimaryGeneratedColumn("uuid")
    incidentId: string
    @Column("text")
    reportNumber: string
    @Column({
        type: 'date',
        default: () => 
        'CURRENT_DATE'
    })
    incidentDateOpening:  Date
    @Column("text",{nullable:true, default: 'PENDIENTE'})
    status: string
    @Column("text")
    incidentDescription: string
    @Column("text",{nullable:true})
    incidentNote: string
    @Column({
        type: 'date',
        nullable:true
    })
    incidentDateClose:  Date

    //relaciones
    @ManyToOne(()=> Device, {nullable: true})
    @JoinColumn({
        name: "deviceId"
    })
    device: Device

    @ManyToOne(()=> Deparment, {nullable: true})
    @JoinColumn({
        name: "departmentId"
    })
    department: Deparment
}
