import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
    @Column("text",{default: 'PENDIENTE'})
    status: string
    @Column("text")
    incidentDescription: string
    @Column("text",{nullable:true})
    incidentNote: string
    @Column({
        type: 'date',
        default: () => 
        'CURRENT_DATE'
    })
    incidentDateClose:  Date

}
