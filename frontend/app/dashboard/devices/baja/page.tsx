import { authHeaders } from "@/app/helpers/authHeaders";
import { API_URL } from "@/constants";
import { Device } from "@/entities";
import { Button } from "@heroui/react";
import { ArrowLeft, ArchiveX } from "lucide-react";
import Link from "next/link";
import LowDeviceList from "./_components/LowDeviceList";
import { response } from "express";
import { types } from "util";
import SearchLowDevices from "./_components/SearchLowDevice";
import DownloadBajasButton from "./_components/DownloadBajasButton";


const CATEGORY_CONFIG = {
    computing:{
        label: "Laptops y Desktops ",
        types: ["Laptop","Desktop"],
        backUrl: "/dashboard/devices"
    },
    printing:{
        label: "Impresoras",
        types: ["Printer"],
        backUrl: "/dashboard/printers"
    },
    mobile:{
        label: "Dispositivos Móviles",
        types: ["Celular","Tablet","iPad"],
        backUrl: "/dashboard/smartphones"
    },
    peripheral:{
        label: "Periféricos",
        types: ["Teclado","Mouse","Docking","Diadema","Token","Bocina","Monitor","Lector de barras"],
        backUrl: "/dashboard/accesories"
    }


}
  
     
      export default async function BajaPage({ searchParams }:{searchParams: {[key:string]: string | string[] | undefined}}) {
        // 1. Obtener configuración
        const rawCategory = typeof searchParams?.category === 'string' ? searchParams.category : 'computing';
        const categoryKey = (CATEGORY_CONFIG[rawCategory as keyof typeof CATEGORY_CONFIG] ? rawCategory : 'computing') as keyof typeof CATEGORY_CONFIG;
        //console.log("categoria: ",categoryKey)
        const config = CATEGORY_CONFIG[categoryKey];
        //console.log("Configuración seleccionada:", config.label);
     
        let devices : Device[] = []

        const query = typeof searchParams?.q === 'string' ? searchParams.q : ""
        const filterBy = typeof searchParams?.f === 'string' ? searchParams.f : ""

        let endpoint = `${API_URL}/devices`
        if(query && filterBy){
            switch(filterBy){
                case "hostname":
                    endpoint = `${API_URL}/devices/hostname/${query}`
                    break;
                case "asset":
                    endpoint = `${API_URL}/devices/asset-number/${query}`
                    break;
                case "department":
                    endpoint = `${API_URL}/devices/department/${query}`
                    break;
                case "brand":
                    endpoint = `${API_URL}/devices/brand/${query}`
                    break;
                case "type":
                    endpoint = `${API_URL}/devices/type/${query}`
                    break;
                case "location":
                    endpoint = `${API_URL}/devices/location-name/${query}`
                    break;
                case "model":    
                endpoint = `${API_URL}/devices/model/${query}`
                break;
                default: break
            }
        }
        // 2. Fetch de datos
        const res = await fetch(endpoint, {
          headers: { ...authHeaders() },
          cache: "no-cache",
        });
        
        if(res.ok){
            const data = await res.json()
            const rawDevices = Array.isArray(data) ? data : [data]

            devices = rawDevices.filter((d: Device)=>{
                const type = d.deviceType?.toLowerCase().trim() || ""
                const status = d.deviceStatus?.toUpperCase() || ""

                const isBaja = status === "BAJA"
                const isAllowed = config.types.some(t => type.includes(t.toLowerCase()))

                return isBaja && isAllowed
            })
        }
     
        // Usamos un Set para eliminar duplicados y ordenamos alfabéticamente
        const uniqueModels = Array.from(new Set(devices.map(d => d.deviceModel))).filter(Boolean).sort();
    
        return (
          <div className="w-full h-auto flex flex-col gap-6 mt-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-2 text-slate-800 ml-4">
                  Historial de Bajas Equipos IT
                </h1>
                <p className="text-slate-500 ml-4">
                  {config.label}
                  ({devices.length} encontrados)
                </p>
              </div>
              <div className="rounded-md mt-6 flex flex-col md:flex-row gap-3">
              <Link href={config.backUrl}>
                <Button  color="secondary" variant="flat" radius="full" className="font-bold w-full md:w-auto" startContent={<ArrowLeft size={20} />}>
                  Volver
                </Button>
              </Link>

              <DownloadBajasButton category={categoryKey} availableModels={uniqueModels}/>
              </div>
              
            </div>
            <SearchLowDevices/>
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-2">
                <LowDeviceList devices={devices}/>
            </div>
          </div>
          
        );
}
