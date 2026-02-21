import { API_URL } from "@/constants";
import { Device } from "@/entities";
import { authHeaders } from "@/app/helpers/authHeaders";
import Link from "next/link";
import { Button } from "@heroui/react";
import CreateAccesories from "./_components/CreateAccesories";
import SearchAccesories from "./_components/SearchAccesories";
import AccesoriesList from "./_components/AccesoriesList";
import { BriefcaseBusiness } from "lucide-react";
import { LinkToLow } from "../devices/_components/device-table/LinkToLow";

export default async function AccesoriesPage({searchParams, onClose}:{searchParams: {[key:string]: string | string[] | undefined}, onClose: ()=>void}){
    const ALLOWED_TYPES = [
        "mouse", "mouses", 
        "keyboard", "teclado", 
        "docking", 
        "monitor", "pantalla", 
        "diadema",
        "token", "lector de barras", "bocina"
    ]

    const EXCLUDED_TYPES = [
        "printer", "impresora", "multifuncional", "copiadora", "scanner",
        "phone", "celular", "smartphone", "iphone",
        "tablet", "ipad", "android",
        // Computadoras
        "laptop", "laptops",
        "desktop", "desktops","pc", "computadora",
    ];

    const IS_BAJA = [
        "baja"
    ]

    let devices: Device[] = []
    const query = typeof searchParams?.q === 'string' ? searchParams.q : ""
    const filterBy = typeof searchParams?.f === 'string' ? searchParams.f : ""
    let endpoint = `${API_URL}/devices`
    if(query && filterBy){
        switch(filterBy){
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
            case "department":
                endpoint = `${API_URL}/devices/department/${query}`
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
            const type = d.deviceType?.toLowerCase().trim()||""
            const down = d.deviceStatus?.toLowerCase() || ""
            
            const isAllowed = ALLOWED_TYPES.some(allowed => type.includes(allowed))
            const isExcluded = EXCLUDED_TYPES.some(excluded => type.includes(excluded))
            const isBaja = IS_BAJA.some(excluded => down.includes(excluded))

            return isAllowed && !isExcluded && !isBaja
        })
    }

    async function getLocations() {
        const response = await fetch(`${API_URL}/locations`,{
            headers:{
                ...authHeaders(),
            },
            cache: 'no-store'
        })
        return await response.json()
    }

    async function getEmployees() {
        const response = await fetch(`${API_URL}/employees`,{
            headers:{
                ...authHeaders(),
            },
            cache: 'no-store'
        })
        return await response.json()
    }

    async function getDepartments() {
        const response = await fetch(`${API_URL}/departments`,{
            headers:{
                ...authHeaders(),
            },
            cache: 'no-store'
        })
        return await response.json()
    }

    const locations = await getLocations()
    const employees = await getEmployees()   
    const departments = await getDepartments()   

    return(
        <div className="w-full h-auto flex flex-col gap-6 mt-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 ml-4">Inventario de Periféricos IT</h1>
                    <p className="text-slate-500 ml-4">
                        Accesorios y Periféricos ({devices.length} encontrados)
                    </p>
                </div>
               
                <div className="rounded-md mt-6 flex flex-col md:flex-row gap-3">
                    <LinkToLow category="peripheral"/>
                    <Link href={"/dashboard/departments"}>
                            <Button color="secondary" variant="flat" className="font-bold w-full md:w-auto" startContent={<BriefcaseBusiness size={20}/>}>
                                Departamentos
                            </Button>
                    </Link>
                    <CreateAccesories locations={locations} employees={employees} departments={departments}/>
                    
                </div>
            </div>
            <SearchAccesories />
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-2">
            <AccesoriesList devices={devices} locations={locations} employees={employees} departments={departments} onClose={onClose}/>
            </div>
        </div>
        
    )
}