import { Tracing } from "puppeteer";
import { Employee } from "src/employees/entities/employee.entity";
import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate }from "typeorm";
import { ManyToOne } from "typeorm";
import { JoinColumn } from "typeorm";
import { OneToOne } from "typeorm";
import { OneToMany } from "typeorm";


@Entity()
export class User {
@PrimaryGeneratedColumn('uuid')
userId: string
@Column("text",{unique:true})
userEmail: string
@Column("text",{unique:true})
userPassword: string
@Column('simple-array',{default: "Admin"})
userRoles: string[]

@OneToOne(()=> Employee, {eager: true})
@JoinColumn({name: "employeeId"})
employee: Employee

//encriptacion automatica
/*@BeforeInsert()
@BeforeUpdate()
async hashPassword(){
    if(!this.userPassword) return;
    if(!this.userPassword.startsWith('$2b$')){
        const salt = await bcrypt.genSalt();
        this.userPassword = await bcrypt.hash(this.userPassword, salt)
    }
}*/
}

