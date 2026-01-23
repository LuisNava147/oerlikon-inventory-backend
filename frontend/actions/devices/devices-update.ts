'use server'
import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { revalidatePath, revalidateTag } from "next/cache"


export async function updateDevice(deviceId: string,prevState:any,formData:FormData) {
   //const deviceId = formData.get("deviceId")?.toString()
    //if(!deviceId)return {success: false, message: "No se identificó el equipo a editar."}*/

    const getVal = (key: string)=>{
        const val = formData.get(key)?.toString().trim()
        return val === "" ? null : val
    }

    const locationId= formData.get("location")?.toString()
    const employeeId = formData.get("employee")?.toString()

    try{

    const deviceData = {
        deviceType: formData.get("deviceType"),
        deviceBrand: formData.get("deviceBrand"),
        deviceModel: formData.get("deviceModel"),
        deviceSerialTag: formData.get("deviceSerialTag"),
        deviceHostName: getVal("deviceHostName") || null,
        deviceAssetNumber: getVal("deviceAssetNumber") || null,

        location: locationId ? locationId.toString() : null,
        employee: employeeId ? employeeId : null
    }
    console.log("Actualizando: ",deviceData)

    const response = await fetch(`${API_URL}/devices/${deviceId}`,{
        method: "PATCH",
        headers:{
            'content-type':'application/json',
            ...authHeaders(),
           
        },
        body: JSON.stringify(deviceData),
    })
    revalidatePath('/dashboard/devices');
    return {success: true}
    }catch(error:any){
        return {success: false}
    }
}