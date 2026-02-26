
import { API_URL } from "@/constants";
import { Incident } from "@/entities";
import { authHeaders } from "@/app/helpers/authHeaders";
import SearchDeviceIncident from "./_components/incidents-table/SearchDevicesIncidents";
import DeviceIncidentList from "./_components/incidents-table/DeviceIncidentList";
import CreateDeviceIncident from "./_components/incidents-table/CreateDeviceIncident";


export default async function IncidentPage({searchParams}:{searchParams: {[key:string]: string | string[] | undefined}}){
    

    
    let incidents: Incident[] = []
    const query = typeof searchParams?.q === 'string' ? searchParams.q : ""
    const filterBy = typeof searchParams?.f === 'string' ? searchParams.f : ""
    
    let endpoint = `${API_URL}/incidents`
    if(query && filterBy){
        switch(filterBy){
            case "report-number":
                endpoint = `${API_URL}/incidents/report-number/${query}`
                break;
            case "device-name":
                endpoint = `${API_URL}/incidents/device-name/${query}`
                break;
            case "department-name":
                endpoint = `${API_URL}/incidents/department-name/${query}`
                break;
            case "location-name":
                endpoint = `${API_URL}/incidents/location-name/${query}`
                break;
            default:
                break;
        }
    }

    const response = await fetch(endpoint,{
        headers:{
            ...authHeaders()
        },
        next:{
            tags:["dashboard:incidents"]
        },
        cache:'no-store'
    })

    
    if(response.ok){
        const data = await response.json()
        incidents = Array.isArray(data) ? data : [data]

    }

    async function getDevices() {
        const response = await fetch(`${API_URL}/devices`,{
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

    
    const devices = await getDevices()
    const departments = await getDepartments()  
    
    return (
        <div className="w-full h-full flex flex-col gap-8 mt-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                <h1 className="text-3xl font-bold text-slate-800 ml-4">Gestión de Incidentes de Equipos</h1>
                <p className="text-slate-500 ml-4">Administra los incidentes activos de la planta ({incidents.length} incidentes encontrados) </p>
                </div>
                <div className="rounded-md mt-6 flex md:flex-row gap-3">
                    <CreateDeviceIncident devices={devices}/>
                </div>
            </div>
            
                
                     <SearchDeviceIncident />
             
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-2">
                    <DeviceIncidentList incidents={incidents} departments={departments} devices={devices}/>
                </div>
            
        </div>
    )
}
