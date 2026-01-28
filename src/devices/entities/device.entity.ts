import { Assignment } from "src/assignments/entities/assignment.entity";
import { Deparment } from "src/deparments/entities/deparment.entity";
import { Employee } from "src/employees/entities/employee.entity";
import { Incident } from "src/incidents/entities/incident.entity";
import { Location } from "src/locations/entities/location.entity";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ManyToOne } from "typeorm";
import { JoinColumn } from "typeorm";
import { OneToMany } from "typeorm";

@Entity()
export class Device {
@PrimaryGeneratedColumn("uuid")
deviceId: string
@Column("text",{unique:true, nullable:true})
deviceHostName: string
@Column("text",{unique:true, nullable:true})
deviceAssetNumber: string
@Column("text",{unique:true})
deviceSerialTag: string
@Column("text",{default:"Stock"})
deviceStatus: string
@Column("text")
deviceType: string
@Column("text")
deviceModel: string
@Column("text")
deviceBrand: string
@Column("text",{nullable:true})
devicePassword:string
@Column("text",{nullable:true})
devicePin: string
@Column("text",{nullable:true})
ipAddress: string
@Column("text",{nullable:true})
sapName: string
@Column("text",{nullable:true})
deviceMAC: string
@Column("text",{nullable:true})
deviceAccount: string

@ManyToOne(()=> Location, {nullable:false, onDelete:'SET NULL'})
@JoinColumn({name: "locationId"})
location: Location | string

@ManyToOne(()=> Deparment, {nullable:true, onDelete:'SET NULL'})
@JoinColumn({name: "departmentId"})
department: Deparment

@ManyToOne(()=> Employee, (employee) => employee.device, {nullable:true, onDelete:'SET NULL'})
@JoinColumn({name: "employeeId"})
employee: Employee

@OneToMany(()=> Assignment,(assignment)=> assignment.device)
assignment: Assignment[]

@OneToMany(()=> Incident, (incident)=> incident.device)
incident: Incident[]
}
