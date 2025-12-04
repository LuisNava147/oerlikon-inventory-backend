import {Entity, Column, PrimaryGeneratedColumn }from "typeorm";
import { ManyToOne } from "typeorm";
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
}
