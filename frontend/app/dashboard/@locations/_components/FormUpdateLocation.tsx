import { updateLocation } from "@/actions/locations/update";
import { API_URL } from "@/constants";
import { Button, Input, Skeleton } from "@heroui/react";
import { response } from "express";
import { Save } from "lucide-react";
import { authHeaders } from "@/app/helpers/authHeaders";
import { Location } from "@/entities";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default async function FormUpdateLocation({devices}:{devices?: string | string[] | undefined}){
    if(!devices || devices === "0" || devices==undefined) return null;
    const deviceId= devices.toString()

    const responseLocation = await fetch(`${API_URL}/locations/${deviceId}`, {
        headers: {
            ...authHeaders()
        },
        next: {
            tags: [`dasboard:locations:${deviceId   }`]
        }
    })

    const foundLocation: Location = await responseLocation.json()
    const updateWithDeviceId = updateLocation.bind(null,deviceId)
    
  return (
    <form action={updateWithDeviceId} className="flex flex-col gap-4">
      <Input isRequired defaultValue={foundLocation?.locationName} label="Nombre de Sede" name="locationName" variant="bordered"/>
      <Input isRequired defaultValue={foundLocation?.locationAddress} label="Dirección de la ubicación" name="locationAddress" variant="bordered"/> 
        <Button type="submit" color="primary"  className="w-full font-bold">
        <Save size={28}/>Guardar Cambios
        </Button>
    </form>
  )    
}