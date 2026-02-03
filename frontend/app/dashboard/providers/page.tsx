import { API_URL } from "@/constants";
import { Device, Employee, Provider } from "@/entities";
import { authHeaders } from "@/app/helpers/authHeaders";
import CreateProvider from "./_components/CreateProvider";

export default async function ProviderPage({searchParams, onClose}:{searchParams:{[key:string]: string | string[] | undefined}, onClose:()=>void}){
    
    let providers: Provider[] = []
    const query = typeof searchParams?.q === 'string' ? searchParams.q : ""
    const filterBy = typeof searchParams?.f === 'string' ? searchParams.f : ""

    let endpoint = `${API_URL}/providers`
    if(query && filterBy){
        switch(filterBy){
            case "name":
                endpoint = `${API_URL}/providers/provider-name/${query}`
                break;
            case "email":
                endpoint = `${API_URL}/providers/provider-email/${query}`
                break;
            case "phone-number":
                endpoint = `${API_URL}/providers/provider-phone/${query}`
                break;
            case "location":
                endpoint = `${API_URL}/providers/location-name/${query}`
                break;
            default:
            break;
        }
    }

    const response = await fetch(endpoint,{
        headers:{
            ...authHeaders(),
        },
        next:{
            tags:['dashboard/providers']
        },
        cache:'no-cache'
    })

    if(response.ok){
        const data = await response.json()
        providers = Array.isArray(data) ? data : [data]
        
    }
    async function getLocations() {
        const response = await fetch(`${API_URL}/locations`,{
            headers:{
                ...authHeaders()
            },
            cache:'no-store'
        })
        return await response.json()
    }

        const locations = await getLocations()
   
        return(
            <div className="w-full h-auto flex flex-col gap-6 mt-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 ml-4">
                            Provedores Oerlikon
                        </h1>
                        <p className="text-slate-500 ml-4">
                        Gestiona el personal ({providers.length} provedores encontrados)
                        </p>
                    </div>
                    <div className="rounded-md mt-6">
                        <CreateProvider locations={locations}/>
                    </div>
                </div>
                <p>buscar</p>
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-2">
                <p>lista</p>
                </div>
            </div>
        ) 
}
