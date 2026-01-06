
import { createLocation } from "@/actions/locations/create";
import { API_URL } from "@/constants";
import { Button, Input } from "@heroui/react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import  { useState } from "react";

export default function FormNewLocation({devices}:{devices?:string | string[]}){
    if(devices) return null

    return(
        <form action={createLocation} className="bg-white px-4 flex flex-col gap-6 w-full rounder-lg">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Plus className="text-blue-600"/> 
                Crear nueva Sede
            </h3>
            <div className="grid grid-cols-2 gap-2">
            <Input isRequired label="Nombre" placeholder="Queretaro" name="locationName"/>
            <Input isRequired label="Dirección" name="locationAddress"/>
            </div>
            <Button type="submit" color="primary" className="w-full font-bold">
                Guardar Ubicación
            </Button>
        </form>
    )
}