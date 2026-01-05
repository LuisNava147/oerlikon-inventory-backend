'use client';

import { API_URL } from "@/constants";
import { Button, Input } from "@heroui/react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import  { useState } from "react";

export default function FormNewLocation({devices}:{devices?:string | string[]}){
    if(devices) return null

    const[loading, setLoading] = useState(false);
    const router= useRouter();

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);

        try{
            const res = await fetch(`${API_URL}/locations`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    locationName: formData.get("locationName"),
                    locationAddress: formData.get("locationAddress"),

                })
            });
            if(res.ok){
                router.refresh();
                (e.target as HTMLFormElement).reset();
            }
        }catch(error){
            console.error(error);
        }finally{
            setLoading(false);
        }
    };
    return(
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Plus className="text-blue-600"/> 
                Crear nueva Sede
            </h3>
            <div className="grid grid-cols-2 gap-2">
            <Input isRequired label="Nombre" placeholder="Queretaro" name="locationName"/>
            <Input isRequired label="Dirección" name="locationAddress"/>
            </div>
            <Button type="submit" color="primary" isLoading={loading} className="w-full font-bold">
                Guardar Ubicación
            </Button>
        </form>
    )
}