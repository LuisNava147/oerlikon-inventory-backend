import { AccessRequest } from "src/access-requests/entities/access-request.entity";
import { Location } from "src/locations/entities/location.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ManyToOne, OneToMany } from "typeorm";
import { JoinColumn } from "typeorm";
import { OneToOne } from "typeorm";

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

    @ManyToOne(()=> Location,(location)=> location.provider)
    @JoinColumn({
        name: "locationId"
    })
    location: Location

    /*@OneToMany(()=>AccessRequest,(accessRequest)=>accessRequest.provider)
    accessRequest: AccessRequest[]*/
}
