'use server'
import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";

export async function createDevice(prevState:any,formData:FormData) {
    const locationId= formData.get("location")?.toString()
    const employeeId = formData.get("employee")?.toString()

    try{
    
    const deviceData = {
        deviceHostName: formData.get("deviceHostName") || null,
        deviceAssetNumber: formData.get("deviceAssetNumber") || null,
        deviceType: formData.get("deviceType"),
        deviceModel: formData.get("deviceModel"),
        deviceBrand: formData.get("deviceBrand"),
        deviceSerialTag: formData.get("deviceSerialTag"),
        location: locationId ? locationId.toString() : null,
        employee: employeeId ? employeeId : null


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

    revalidatePath('/dashboard/devices');

    return{success: true}
}catch(error:any){
    return{success:false, error: error.message}
}
}