"use client"
import { createLocation } from "@/actions/locations/create";
import { API_URL } from "@/constants";
import { Button, Input } from "@heroui/react";
import { CirclePlus, Plus, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import  { useState } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton(){
    const {pending} = useFormStatus()
    return(
        <Button type= "submit" color="primary" className="w-full font-bold shadow-lg shadow-blue-500/30" isLoading={pending}
        startContent={!pending && <Save size={20}/>}>
        {pending ? "Guardando..." : "Guardar Ubicación"}
        </Button>
    )
}

export default function FormNewLocation({devices}:{devices?:string | string[]}){
    if(devices) return null

    return(
        <form action={createLocation} className="bg-white px-4 py-6 flex flex-col gap-6 w-full rounded-lg shadow-md">
            <div>
            <h3 className="text-start text-lg font-bold text-slate-800 flex items-center gap-2">
                <div className="p-2 bg-red-100 rounded-lg text-red-600">
                <CirclePlus className="text-red-600"/>
                </div> 
                Crear nueva Ubicación
            </h3>
            
            </div>
            
            
            <div className="grid grid-cols-2 gap-2 font-bold">
            <Input isRequired color="primary" variant="bordered" label="Nombre" placeholder="Queretaro" name="locationName" classNames={{inputWrapper: "bg-slate-50"}}/>
            <Input isRequired color="primary" variant="bordered" label="Dirección" placeholder="Parque Industrial La Montaña S/N" name="locationAddress" classNames={{inputWrapper: "bg-slate-50"}}/>
            </div>
            <SubmitButton />
        </form>
    )
}