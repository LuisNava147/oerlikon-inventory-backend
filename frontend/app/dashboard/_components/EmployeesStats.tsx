
import { API_URL } from "@/constants";
import { Card, CardBody } from "@heroui/react";
import { ArrowRight, Laptop, Monitor, Printer, TicketSlash, User } from "lucide-react";
import Link from "next/link";
import { authHeaders } from "@/app/helpers/authHeaders";
import { Device, Employee, Location, Incident } from "@/entities";

export default async function EmployeeStats({devices}:{devices: string | string[] | number}) {
    if(!devices || devices === "0") return null;

    const isPrinter= (type:string)=>{
        if(!type)return false
        const t = type.toLowerCase();
        return t.includes("printer") || t.includes("impresora")
    }

    let computerCount = 0
    let printerCount = 0
    const responseEmployees = await fetch(`${API_URL}/employees`,{
        headers:{
            ...authHeaders()
        },
        next:{
            tags:["dashboard:employees",]
        }
    })
    const dataEmployee: Employee[] = await responseEmployees.json()

    const responseDevices = await fetch(`${API_URL}/devices`,{
        headers:{
            ...authHeaders()
        },
        next:{
            tags:["dashboard:devices",]
        }
    })
    const dataDevices: Device[] = await responseDevices.json()

    const responseIncident = await fetch(`${API_URL}/devices-incidents`,{
        headers:{
            ...authHeaders()
        },
        next:{
            tags:["dashboard:devices-incidents"]
        }
    })
    const dataIncidents: Incident[] = await responseIncident.json()

    if(Array.isArray(dataDevices)){
        const printers = dataDevices.filter((d: any)=> isPrinter(d.deviceType))
        printerCount = printers.length
        computerCount = dataDevices.length - printerCount
    }
    return(
        <>
        
        <Card className="text-white shadow-lg border border-slate-200">
            <CardBody className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-slate-400  font-bold text-xs uppercase tracking-wider">Total de Empleados</p>
                        <h3 className="text-4xl text-black font-bold mt-2">{dataEmployee.length}</h3>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-xl">
                        <User size={24} className="text-red-600"/>
                    </div>
                </div>
                <Link href={"/dashboard/employees"} className="mt-6 flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-red-500 transition-colors group">
                    Ver directorio <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform"/>
                </Link>
            </CardBody>
        </Card>
        <Card className="bg-white border border-slate-200 shadow-lg">
            <CardBody className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-wider">Equipos Totales</p>
                        
                        <div className="mt-2 flex items-center gap-2">
                        <h3 className="text-4xl font-bold mt-2 text-slate-800">{computerCount}</h3>

                        </div>
                        
                    </div>
                    <div> 
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-wider">Impresoras Totales</p>
            
                            <div className="mt-2 flex items-center gap-2">
                            <h3 className="text-4xl font-bold mt-2 text-slate-800">{printerCount}</h3>

                            </div>
                            
                    </div>
                    <div className="p-3 bg-orange-50 rounded-xl">
                                <Laptop size={24} className="text-red-600" />
                        </div>
                  
                   
                </div>
            </CardBody>
        </Card>
        <Card className="bg-white border border-slate-200 shadow-lg">
            <CardBody className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-wider">Incidentes Activos</p>
                        <h3 className="text-4xl font-bold mt-2 text-slate-800">{dataIncidents.length}</h3>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-xl">
                        <TicketSlash size={24} className="text-red-600" />
                    </div>
                </div>
                <div className="mt-6">
                     <Link href="/dashboard/ticket-incidents" className="mt-6 flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-red-500 transition-colors group">
                        Gestionar tickets <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform"/>
                     </Link>
                </div>
            </CardBody>
        </Card>
        </>
    )
    
}