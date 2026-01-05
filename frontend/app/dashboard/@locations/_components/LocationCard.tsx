import { API_URL } from "@/constants"

export default async function LocationCard({devices}:{devices: string | string[] | undefined}) {
    if(!devices)return null

    const response = await fetch(`${API_URL}/locations/{devices}`,{
        headers:{
            
        }
    })
    
}