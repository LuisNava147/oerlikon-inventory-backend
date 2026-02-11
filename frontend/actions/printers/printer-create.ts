'use server'
import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";

export async function createPrinter(prevState:any,formData:FormData) {
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
        deviceStatus: "Stock" || null,
        ipAddress: formData.get("ipAddress") || null,
        sapName: formData.get("sapName") || null,
        deviceMAC: formData.get("deviceMAC") || null,
        location: locationId ? locationId.toString() : null,    
        department: departmentId ? departmentId.toString() : null
    }

    if(departmentId){
        deviceData.deviceStatus = "Asignado"
    }else{
        deviceData.deviceStatus = "Stock"
    }
    //console.log(deviceData)

    const response = await fetch(`${API_URL}/devices`,{
        method: "POST",
        headers:{
            ...authHeaders(),
            'Content-Type':'application/json',
        },
        body: JSON.stringify(deviceData)
    })
    //console.log(await response.json())

    revalidatePath('/dashboard/printers');

    return{success: true}
}catch(error:any){
    return{success:false, error: error.message}
}
}