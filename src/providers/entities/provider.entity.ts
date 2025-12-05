import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Provider {
    @PrimaryGeneratedColumn("uuid")
    providerId: string
    @Column("text")
    providerName: string
    @Column("text",{unique:true, nullable: true})
    providerEmail: string 
    @Column("text",{unique:true, nullable:true})
    providerPhoneNumber: string
    @Column("text")
    providerContactName: string    
}
