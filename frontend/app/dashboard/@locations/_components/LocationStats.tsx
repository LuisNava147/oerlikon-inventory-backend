import { API_URL } from "@/constants";
import { Card, CardBody } from "@heroui/react";
import { Laptop, MonitorSmartphone, User } from "lucide-react";
import { useState } from "react";
import { authHeaders } from "@/app/helpers/authHeaders";
import { Location } from "@/entities";

export default async function LocationStats({devices}:{devices: string | string[] | undefined}){
    
    if (!devices || devices === "0") return null;
    const response = await fetch(`${API_URL}/locations/stats/${devices}`, {
        headers:{
            ...authHeaders()
        },
        next: {
            tags: ["dasboard:locations",`dasboard:locations:${devices}`]
        }
    });
    const data: Location = await response.json() 

    return(
        <div className="grid grid-cols-2 gap-4 mt-4">
            <Card className="shadow-md ">
                <CardBody className="flex flex-row items-center gap-4 p-4">
                    <div className="p-3 bg-red-600 rounded-full text-white">
                        <User size={20}/>
                    </div>
                    <div>
                        <p className="text-[10px] text-black font-bold uppercase tracking-wider">Empleados:</p> 
                        <p className="text-2xl font-bold text-slate-500">{data.employeesCount || 0}</p> 
                    </div>
                </CardBody>
            </Card>
            <Card className="shadow-md">
            <CardBody className="flex flex-row items-center gap-4 p-4">
                <div className="p-3 bg-red-600 rounded-full text-white">
                    <MonitorSmartphone size={20} />
                </div>
                <div>
                    <p className="text-[10px] text-black font-bold uppercase tracking-wider">Dispositivos:</p>
                    <p className="text-2xl font-bold text-slate-500">{data.devicesCount || 0}</p>
                </div>
            </CardBody>
        </Card>
        </div>
    )
}
