'use server'
import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { revalidatePath, revalidateTag } from "next/cache"


export async function updatePrinter(deviceId: string,prevState:any,formData:FormData) {
   //const deviceId = formData.get("deviceId")?.toString()
    //if(!deviceId)return {success: false, message: "No se identificó el equipo a editar."}*/

    const getVal = (key: string)=>{
        const val = formData.get(key)?.toString().trim()
        return val === "" ? null : val
    }

    const locationId= formData.get("location")?.toString()
    const departmentId = formData.get("department")?.toString()

    try{

    const deviceData = {
        deviceHostName: formData.get("deviceHostName") || null,
        deviceAssetNumber: formData.get("deviceAssetNumber") || null,
        deviceType: formData.get("deviceType"),
        deviceModel: formData.get("deviceModel"),
        deviceBrand: formData.get("deviceBrand"),
        deviceSerialTag: formData.get("deviceSerialTag"),
        deviceStatus: getVal("deviceStatus") || "Stock",
        ipAddress: formData.get("ipAddress") || null,
        sapName: formData.get("sapName") || null,
        deviceMAC: formData.get("deviceMAC") || null,

        location: locationId ? locationId.toString() : null,    
        department: departmentId ? departmentId : null
    }

    if(!departmentId){
        deviceData.deviceStatus = "Stock"
    }else{
        deviceData.deviceStatus = "Asignado"
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
    revalidatePath('/dashboard/printers');
    return {success: true}
    }catch(error:any){
        return {success: false}
    }
}