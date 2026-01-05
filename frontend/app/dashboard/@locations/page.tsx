
import { API_URL } from "@/constants";
import { Card, CardHeader, CardBody, Button, Input, Divider } from "@heroui/react";
import { MapPin, Plus, Trash2, Edit, Search } from "lucide-react";
import { useState } from "react";
import { authHeaders } from "@/app/helpers/authHeaders";
import { Location } from "@/entities";
import LocationCard from "./_components/LocationCard";


const LocationPage = async({searchParams}:{searchParams: {[key:string]: string | string[] | undefined}}) => {
    const response = await fetch(`${API_URL}/locations`,{
        headers:{
            ...authHeaders()
        },
        next: {
            tags:["dashboard:locations"]
        }
    });
    
    return(
        <div className="7/12">
            <div className="w-full flex flex-col items-center h-[90vh] bg-red-50">
                <div className="w.1/2 my-10">
                    <div className="w-full">
                        <LocationCard devices={searchParams.devices}/>
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default LocationPage