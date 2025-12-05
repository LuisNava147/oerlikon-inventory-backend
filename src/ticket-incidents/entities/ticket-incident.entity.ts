import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TicketIncident {
    @PrimaryGeneratedColumn("uuid")
    ticketIncidentId: string
    @Column("text")
    ticketName: string
    @Column("text")
    ticketLink: string
    @Column({
        type: 'date',
        default: ()=>
        'CURRENT_DATE'
    })
    ticketDateOpening:  Date
    @Column({
        type: 'date',
        default: () => 
        'CURRENT_DATE'
    })
    ticketDateClose: Date
    @Column("text",{default: 'PENDIENTE'})
    status: string

}
