
import { API_URL } from "@/constants";
import { Card, CardHeader, CardBody, Button, Input, Divider } from "@heroui/react";
import { MapPin, Plus, Trash2, Edit, Search } from "lucide-react";
import { useState } from "react";
import { authHeaders } from "@/app/helpers/authHeaders";
import { Location } from "@/entities";
import LocationCard from "./_components/LocationCard";
import SelectLocation from "./_components/SelectLocation";
import FormNewLocation from "./_components/FormNewLocation";
import DeleteLocationButtom from "./_components/DeleteLocationButton";
import UpdateLocation from "./_components/UpdateLocation";
import FormUpdateLocation from "./_components/FormUpdateLocation";


const LocationPage = async({searchParams}:{searchParams: {[key:string]: string | string[] | undefined}}) => {
    const response = await fetch(`${API_URL}/locations`,{
        headers:{
            ...authHeaders()
        },
        next: {
            tags:["dashboard:locations"]
        }
    });
    let data: Location[] = await response.json()

    data= [
        {
            locationId: 0,
            locationName: "Nombre de ubicación",
            locationAddress: "Direccion de ubicación",
            employee: [],
            device: [],
            provider: [],
            access_request: []
        },
        ...data
    ]
    
    return(
        <div className="w-full h-[90vh] bg-red-50 p-10 flex flex-col items-center">
            <div className="w-1/2 my-4">
        <SelectLocation locations={data} devices={searchParams?.devices} />
            </div>
            <div className="w-1/2 mb-10">
        <LocationCard devices={searchParams?.devices} />
      </div>

      {/* Formularios y Botones */}
      <div className="w-1/2 flex flex-col gap-4">
        <FormNewLocation devices={searchParams?.devices} />
        
        <div className="flex flex-row gap-4 justify-center">
          <DeleteLocationButtom devices={searchParams?.devices} />
          
          <UpdateLocation devices={searchParams?.devices}>
            <FormUpdateLocation devices={searchParams?.devices} />
          </UpdateLocation>
        </div>
      </div>
        </div>
    )
} 

export default LocationPage