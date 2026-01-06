
import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { Location } from "@/entities";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import Link from "next/link";
import { MapPin, UserCircle } from "lucide-react";

export default async function LocationCard({devices}:{devices: string | string[] | undefined}) {
    if(!devices || devices === "0"){
        return(
            <Card className="w-full bg-gray-200 rounded-lg shadow-none">
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
                <div className="bg-red-600 p-2 rounded-lg text-blue-50">
                    <MapPin size={24}/>
                </div>
                <b className="text-xl font-bold text-slate-800">{data.locationName}</b>
            </CardHeader>
            <Divider />
            <CardBody className="gap-4">
                <p className="w-full font-bold text-slate-600 text-xl">Dirección: <b className="">{data.locationAddress}</b></p>
            </CardBody>
        </Card>
    )
    
}