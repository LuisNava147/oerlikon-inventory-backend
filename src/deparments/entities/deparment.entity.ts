import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Deparment {
@PrimaryGeneratedColumn("uuid")
departmentId: string
@Column("text")
departmentName: string

}
