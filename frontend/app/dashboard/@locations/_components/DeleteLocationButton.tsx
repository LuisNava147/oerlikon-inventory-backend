'use client';

import { API_URL } from "@/constants";
import { Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteLocationButtom({devices}:{devices?:string | string[]}){
    if(!devices || devices === "0") return null;

    const[loading, setLoading] = useState(false);
    const router= useRouter();

    const handleDelete = async () => {
        if(!confirm("¿Estás seguro de eliminar esta ubicación? Se perderán los datos. ")) return;
        
        setLoading(true);
        try{
            await fetch(`${API_URL}/locations/${devices}`,{
                method:'DELETE'
            });
            router.push('/dashboard');
            router.refresh();
        }catch(error){
            console.error(error);
        }finally{
            setLoading(false);
        }
    }
    return(
        <Button onPress={handleDelete} color="danger" variant="flat" isLoading={loading} isIconOnly>
            <Trash2 size={20}/>
        </Button>
    )
}