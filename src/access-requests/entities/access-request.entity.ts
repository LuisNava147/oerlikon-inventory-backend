import { Provider } from "src/providers/entities/provider.entity";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ManyToOne } from "typeorm";
import { JoinColumn } from "typeorm";
import { OneToMany } from "typeorm";

@Entity()
export class AccessRequest {
    @PrimaryGeneratedColumn('uuid')
    accessId: string
    @Column("text")
    applicantFullName: string
    @Column("text")
    centerApplicant: string
    @Column("text")
    centerToAccess: string
    @Column("text")
    visitorName: string
    @Column("text")
    accessReason: string
    @Column({type: "date"})
    accessDate: Date
    @Column({type: "time"})
    accessHour: string
    @Column("text")
    accessDuration: string
    @Column("text",{nullable: true})
    accessUrl: string

    //relaciones
    @ManyToOne(()=> Provider, {nullable:true})
    @JoinColumn({
        name: "providerId"
    })
    provider: Provider
}
