import { Device } from "@/entities";
import { API_URL } from "@/constants";
import { authHeaders } from "@/app/helpers/authHeaders";
import { Button } from "@heroui/react";
import { Plus } from "lucide-react";
import SearchDevices from "./_components/device-table/SearchDevices";
import DeviceList from "./_components/device-table/DeviceList";

export default async function DevicePage({searchParams}:{searchParams: {[key:string]: string | string[] | undefined}}) {
    const ALLOWED_TYPES = [
        // Computadoras
        "laptop", "laptops",
        "desktop", "desktops","pc", "computadora",
        // Periféricos
        "mouse", "mouses", 
        "keyboard", "teclado", 
        "docking", 
        "monitor", "pantalla", 
    ];
    
    let devices: Device[] = []
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
            case "employee":
                endpoint = `${API_URL}/devices/employee-name/${query}`
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
                default:
                    endpoint = `${API_URL}/devices`
                    break;
        }
    }
    const response = await fetch(endpoint, {
        headers:{
            ...authHeaders()
        },
        next:{
            tags:["dashboard:devices"]
        },
        cache: 'no-cache'
    })
    if(response.ok){
        const data = await response.json()
        const rawDevices = Array.isArray(data) ? data : [data]

        devices = rawDevices.filter((d: Device)=>{
            const type = d.deviceType?.toLowerCase()||""
            const isAllowed = ALLOWED_TYPES.some(allowed => type.includes(allowed))
            const isExcluded = type.includes("printer") || type.includes("impresora") || 
            type.includes("phone") || type.includes("celular");

            return isAllowed && !isExcluded
        })
    }

    
    
    return(
        <div className="w-full h-auto flex flex-col gap-6 mt-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 ml-4">Inventario de Equipos IT</h1>
                    <p className="text-slate-500 ml-4">
                        Laptops, Desktops y Periféricos ({devices.length} encontrados)
                    </p>
                </div>
                <Button color="primary" startContent={<Plus size={20}/>} className="font-semibold shadow-md mt-6">
                    Nuevo Equipo
                </Button>
            </div>
            <SearchDevices />
            <DeviceList devices={devices} />
        </div>
        
    )
}