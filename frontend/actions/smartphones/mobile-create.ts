'use server'

import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { revalidatePath } from "next/cache"

export async function createMobile(prevState:any, formData: FormData){
    const locationId = formData.get("location")?.toString()
    const employeeId = formData.get("employee")?.toString()

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
            deviceAccount: formData.get("deviceAccount") || null,
            location: locationId ? locationId.toString() : null,
            employee: employeeId ? employeeId : null
        }
        //console.log(mobileData)

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
        return{success: true}
    }catch(error:any){
        return{success:false, error:error.message}
    }
}