"use server"

import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { revalidatePath } from "next/cache"

export default async function deleteDevice(deviceId: string): Promise<{success: boolean; error: string | null}> {
    
    try{
        const response = await fetch(`${API_URL}/devices/${deviceId}`,{
            method: "DELETE",
            headers:{
                ...authHeaders()
            },
        })
        
            revalidatePath('/dashboard/devices')
        return {success: true, error: null}
    }catch(error){
        return {success: false, error: "Error de conexión"}
    }  
   
}