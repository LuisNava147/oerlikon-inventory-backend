'use server'
import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { revalidatePath, revalidateTag } from "next/cache"


export async function updateDeviceNote(deviceId: string,prevState:any,formData:FormData) {
   //const deviceId = formData.get("deviceId")?.toString()
    //if(!deviceId)return {success: false, message: "No se identificó el equipo a editar."}*/


    try{

    const deviceData = {
        deviceNote: formData.get("deviceNote")?.toString() || null,
    }
    //console.log(deviceData)
    const response = await fetch(`${API_URL}/devices/${deviceId}`,{
        method: "PATCH",
        headers:{
            'content-type':'application/json',
            ...authHeaders(),
           
        },
        body: JSON.stringify(deviceData),
    })
    //console.log(await response.json())
    revalidatePath('/dashboard/devices');
    return {success: true, error:null}
    }catch(error:any){
        return {success: false, error: "Error de conexión"}
    }
}