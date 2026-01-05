
import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { Location } from "@/entities";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import Link from "next/link";
import { MapPin, UserCircle } from "lucide-react";

export default async function LocationCard({devices}:{devices: string | string[] | undefined}) {
    if(!devices || devices === "0"){
        return(
            <Card className="bg-gray-200 border-dashed border-2 shadow-none">
                <CardBody className="py-10 text-center text-gray-800">
                    <p>Selecciona una ubicación para ver detalles</p>
                </CardBody>
            </Card>
        )
    }

    const response = await fetch(`${API_URL}/locations/${devices}`,{
        headers:{
            ...authHeaders()
        },
        cache: 'no-store',
        next: {
            tags:["dashboard:locations",`dashboard:locations:${devices}`]
        }
    });
    if(!response.ok)return <div className="text-red-500">Error cargando datos</div>
    const data: Location = await response.json()
    return(
        <Card className = "w-full shadow-md text-2xl">
            <CardHeader className="flex gap-3 pb-2">
                <div className="bg-blue-600 p-2 rounded-lg text-blue-50">
                    <MapPin size={24}/>
                </div>
                <b className="text-xl font-bold text-slate-800">{data.locationName}</b>
            </CardHeader>
            <Divider />
            <CardBody className="gap-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <UserCircle size={20} className="text-slate-400"/>
                </div>
                <p className="w-full">Dirección:{data.locationAddress}</p>
            </CardBody>
        </Card>
    )
    
}