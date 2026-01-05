'use client';

import { API_URL } from "@/constants";
import { Button, Input, Skeleton } from "@heroui/react";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FormUpdateLocation({devices}:{devices?: string | string[]}){
    if(!devices || devices === "0") return null;

    const [loadingData, setLoadingData] = useState(true);
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    const[formData, setFormData] = useState({
        locationName: "",
        locationAddress: "",
    })
    useEffect(()=> {
        const fetchData = async () => {
            try{
                const res = await fetch(`${API_URL}/locations/${devices}`);
                    if (res.ok) {
                    const data = await res.json();
                    setFormData({
                        locationName: data.locationName || "",
                        locationAddress: data.locationAddress || "",
                    });
                        }
        }catch(error){
            console.error("Error cargando la ubicación",error)
        }finally{
            setLoadingData(false);
        }
    };
    fetchData();
}, [devices]);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);


try{
    const res = await fetch(`${API_URL}/locations/${devices}`,{
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
    });

    if(res.ok){
        router.refresh();
    }else{
        alert("Error al actualizar")
    }
}catch(error){
    console.error(error)
}finally{
    setSaving(false)
}
};
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  if(loadingData){
    return (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      );
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input 
        isRequired 
        label="Nombre de Sede" 
        name="locationName" 
        value={formData.locationName} 
        onChange={handleChange}
        variant="bordered"
      />
      
      <div className="grid grid-cols-2 gap-2">
         <Input 
            isRequired 
            label="Dirección" 
            name="locationAddress" 
            value={formData.locationAddress} 
            onChange={handleChange}
            variant="bordered"
         />
        </div>
        <Button type="submit" color="primary" isLoading={saving} className="w-full font-bold" startContent={!saving && <Save size={28}/>}>
            Guardar Cambios
        </Button>
    </form>
  )    
}