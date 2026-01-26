"use server"

import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { revalidatePath } from "next/cache"

export async function updateDepartment(departmentId: string, prevState: any, formData:FormData){
    const name = formData.get("departmentName")?.toString()

    if(!name || name.trim().length < 3){
        return{success: false}
    }

    try{
        const response = await fetch(`${API_URL}/departments/${departmentId}`,{
            method: "PATCH",
            headers:{
                'Content-Type':'application/json',
                ...authHeaders()
            },
            body: JSON.stringify({departmentName: name})
        })

        if(!response.ok)return {success:false}

        revalidatePath('/dashboard/departments')
        return{success: true}
    }catch(error:any){
        return{success:false}
    }
}