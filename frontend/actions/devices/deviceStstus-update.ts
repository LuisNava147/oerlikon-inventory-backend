'use server'
import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { revalidatePath, revalidateTag } from "next/cache"

export async function updateDeviceStatus(deviceId:string, prevState:any, formData:FormData) {
    try{
    const deviceData = {
        deviceStatus: formData.get("deviceStatus")?.toString()
    }
    //console.log(deviceData)
    const response = await fetch(`${API_URL}/devices/${deviceId}`,{
        method:"PATCH",
        headers:{
            'content-type':'application/json',
            ...authHeaders(),
        },
        body: JSON.stringify(deviceData)
    })
    //console.log(await response.json())
    revalidatePath('/dashboard/devices')
    return {success: true, error: null}
    }catch(error){
        return {success: false, error: "Error de conexión"}
    }
    
}