import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TicketIncident {
    @PrimaryGeneratedColumn("uuid")
    ticketIncidentId: string
    @Column("text")
    ticketName: string
    @Column("text")
    ticketLink: string
    @Column("text")
    ticketDescription: string
    @Column({
        type: 'date',
        default: ()=>
        'CURRENT_DATE'
    })
    ticketDateOpening:  Date
    @Column({
        type: 'date',
        nullable:true
    })
    ticketDateClose: Date
    @Column("text",{default: 'PENDIENTE', nullable:true})
    status: string

}
