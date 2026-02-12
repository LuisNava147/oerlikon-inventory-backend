'use server'
import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { revalidatePath } from "next/cache"

export async function createAccesories(prevState:any,formData:FormData) {
    const locationId= formData.get("location")?.toString()
    const employeeId = formData.get("employee")?.toString()
    const departmentId = formData.get("department")?.toString()

    try{
    
    const deviceData = {
        deviceAssetNumber: formData.get("deviceAssetNumber") || null,
        deviceType: formData.get("deviceType"),
        deviceModel: formData.get("deviceModel"),
        deviceBrand: formData.get("deviceBrand"),
        deviceSerialTag: formData.get("deviceSerialTag"),
        deviceStatus: "Stock" || null,
        deviceNote: formData.get("deviceNote") || null,

        location: locationId ? locationId.toString() : null || null,
        employee: employeeId ? employeeId : null,
        department: departmentId || null

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

    return{success: true, error:null}
}catch(error:any){
    return{success:false, error: "Error de conexión"}
}
}