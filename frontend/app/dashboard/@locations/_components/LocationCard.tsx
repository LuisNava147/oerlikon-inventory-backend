
import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { Location } from "@/entities";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import Link from "next/link";

export default async function LocationCard({devices}:{devices: string | string[] | undefined}) {
    if(!devices)return null

    const response = await fetch(`${API_URL}/locations/{devices}`,{
        headers:{
            ...authHeaders()
        },
        next: {
            tags:["dashboard:locations",`dashboard:locations:${devices}`]
        }
    });
    const data: Location = await response.json()
    return(
        <Card>
            <CardHeader>
                <b className = "w-full text-2xl">{data.locationName}</b>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-col w-full items-center">
                <p className="w-full">Dirección:{data.locationAddress}</p>
            </CardBody>
        </Card>
    )
    
}