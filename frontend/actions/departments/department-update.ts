"use server"

import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { revalidatePath } from "next/cache"

export async function updateDepartment(departmentId: string, prevState: any, formData:FormData){
    const departmentName = formData.get("departmentName")?.toString()
    const locationId = formData.get("location")?.toString()

    if(!departmentName || departmentName.trim().length < 3){
        return{success: false}
    }

    const payload = {
        departmentName: departmentName.trim(),
        location: locationId ? locationId : null
    }
    //console.log(payload)
    try{
        const response = await fetch(`${API_URL}/departments/${departmentId}`,{
            method: "PATCH",
            headers:{
                'Content-Type':'application/json',
                ...authHeaders()
            },
            body: JSON.stringify(payload)
        })
        //console.log(await response.json())
        if(!response.ok)return {success:false}

        revalidatePath('/dashboard/departments')
        return{success: true}
    }catch(error:any){
        return{success:false}
    }
}