
import { API_URL } from "@/constants";
import { Card, CardBody } from "@heroui/react";
import { ArrowRight, Laptop, Monitor, Printer, TicketSlash, TriangleAlert, User } from "lucide-react";
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

    const isMobile= (type:string)=>{
        if(!type)return false
        const t = type.toLowerCase();
        return t.includes("celular") || t.includes("ipad") || t.includes("tablet")
    }

    const isAccesorie= (type:string)=>{
        if(!type)return false
        const t = type.toLowerCase();
        return t.includes("token") || t.includes("mouse") || t.includes("teclado") 
        || t.includes("docking") || t.includes("diadema") || t.includes("bocina") || t.includes("monitor")
    }

    const isComputer = (type: string) => {
        if(!type) return false;
        const t = type.toLowerCase();
        // Filtramos explícitamente solo lo que consideramos "Equipo IT" principal
        return t.includes("laptop") || t.includes("desktop") || t.includes("pc") || t.includes("computadora");
    }

    const isBaja= (type: string)=>{
        if(!type)return false
        const t = type.toLowerCase()
        return t.includes("baja")
    }

    const unresolvedIncident= (type:string)=>{
        if(!type)return false
        const t = type.toLowerCase();
        return t.includes("resuelto")
    }

    let computerCount = 0
    let printerCount = 0
    let mobileCount = 0
    let accesorieCount = 0
    let unresolvedIncidentCount = 0
    let incidentCount = 0

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

    const responseIncident = await fetch(`${API_URL}/incidents`,{
        headers:{
            ...authHeaders()
        },
        next:{
            tags:["dashboard:devices-incidents"]
        }
    })
    const dataIncidents: Incident[] = await responseIncident.json()
    

    if(Array.isArray(dataDevices)){
        //Nos quedamos SOLAMENTE con los que NO son BAJA
        const activeDevices = dataDevices.filter((d: any) => !isBaja(d.deviceStatus));
        
        //Clasificar cada categoría DIRECTAMENTE (sin restas)
        const computers = activeDevices.filter((d: any) => isComputer(d.deviceType));
        const printers = activeDevices.filter((d: any) => isPrinter(d.deviceType));
        const mobiles = activeDevices.filter((d: any) => isMobile(d.deviceType));
        const accesories = activeDevices.filter((d: any) => isAccesorie(d.deviceType));
        
        //Asignar los valores exactos
        computerCount = computers.length;
        printerCount = printers.length;
        mobileCount = mobiles.length;
        accesorieCount = accesories.length;
        
    }

    if(Array.isArray(dataIncidents)){
        const incidents =dataIncidents.filter((d:any)=> unresolvedIncident(d.status))
        unresolvedIncidentCount = incidents.length
        incidentCount = dataIncidents.length - unresolvedIncidentCount

    }
    return(
        <>
        
        <Card className="text-white shadow-lg border border-slate-200">
            <CardBody className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-slate-400  font-bold text-xs uppercase tracking-wider">Total de Empleados</p>
                        <h3 className="text-4xl text-slate-800 font-bold mt-2">{dataEmployee.length}</h3>
                    </div>
                    <div className="p-3 bg-red-600 rounded-xl">
                        <User size={24} className="text-white"/>
                    </div>
                </div>
                <Link href={"/dashboard/employees"} className="mt-6 flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-red-500 transition-colors group">
                    Ver directorio <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform"/>
                </Link>
            </CardBody>
        </Card>
        <Card className="bg-white border border-slate-200 shadow-lg">
            <CardBody className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div className="flex justify-between items-start md:border-r border-slate-100 md:pr-6">
                        <div>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-wider">Equipos Totales</p>
                        <h3 className="text-4xl font-bold mt-2 text-slate-800">{computerCount}</h3>
                        </div>
                        <div className="p-3 bg-red-600 rounded-xl">
                        <Laptop size={24} className="text-white" />
                        </div>
                    </div>
                    <div className="flex justify-between items-start md:pl-6">
                        <div>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-wider">Impresoras Totales</p>
                        <h3 className="text-4xl font-bold mt-2 text-slate-800">{printerCount}</h3>
                        </div> 
                        <div className="p-3 bg-red-600 rounded-xl">
                        <Printer size={24} className="text-white" />
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
        <Card className="text-white shadow-lg border border-slate-200">
            <CardBody className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-slate-400  font-bold text-xs uppercase tracking-wider">Incidentes de Equipos Activos</p>
                        <h3 className="text-4xl text-slate-800 font-bold mt-2">{incidentCount}</h3>
                    </div>
                    <div className="p-3 bg-red-600 rounded-xl">
                        <TriangleAlert size={24} className="text-white"/>
                    </div>
                </div>
                <Link href={"/dashboard/incidents"} className="mt-6 flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-red-500 transition-colors group">
                    Ver directorio <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform"/>
                </Link>
            </CardBody>
        </Card>
        </>
    )
    
}