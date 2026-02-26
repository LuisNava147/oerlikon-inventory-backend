'use server'

import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { revalidatePath } from "next/cache"

export async function createMobile(prevState:any, formData: FormData){
    const locationId = formData.get("location")?.toString()
    const employeeId = formData.get("employee")?.toString()
    const departmentId = formData.get("department")?.toString()

    try{
        const mobileData = {
            deviceHostName: formData.get("deviceHostName") || null,
            deviceAssetNumber: formData.get("deviceAssetNumber") || null,
            deviceType: formData.get("deviceType"),
            deviceModel: formData.get("deviceModel"),
            deviceBrand: formData.get("deviceBrand"),
            deviceSerialTag: formData.get("deviceSerialTag"),
            devicePassword: formData.get("devicePassword") || null,
            devicePin: formData.get("devicePin") || null,
            deviceStatus: "Stock",
            deviceAccount: formData.get("deviceAccount") || null,

            location: locationId ? locationId.toString() : null,
            employee: employeeId ? employeeId : null,
            department: departmentId || null
        }

        if(employeeId){
            mobileData.deviceStatus = "Asignado"
        }else{
            mobileData.deviceStatus = "Stock"
        }

        console.log(mobileData)

        const response = await fetch(`${API_URL}/devices`,{
            method: "POST",
            headers:{
                ...authHeaders(),
                'Content-Type':'application/json'
            },
            body: JSON.stringify(mobileData)
        })
        //console.log(await response.json())
        revalidatePath('/dashboard/smartphones')
        return{success: true, error: null}
    }catch(error:any){
        return{success:false, error:"Error de conexión"}
    }
}