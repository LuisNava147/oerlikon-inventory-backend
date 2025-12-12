import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Device {
@PrimaryGeneratedColumn("uuid")
deviceId: string
@Column("text",{unique:true, nullable:true})
deviceHostName: string
@Column("text",{unique:true, nullable:true})
deviceAssetNumber: string
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

}
