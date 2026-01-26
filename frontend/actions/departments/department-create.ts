"use server"
import { authHeaders } from "@/app/helpers/authHeaders"
import { API_URL } from "@/constants"
import { revalidatePath } from "next/cache"

export async function createDepartment(prevState:any,formData:FormData) {
    const departmentName = formData.get("departmentName")?.toString()

    if(!departmentName || departmentName.trim().length < 3){
        return{success: false}
    }

    const payload = {
        departmentName: departmentName.trim(),
    }

    try{
        const response = await fetch(`${API_URL}/departments`,{
            method: "POST",
            headers:{
                'Content-Type':'application/json',
                ...authHeaders(),
            },
            body: JSON.stringify(payload)
        })

        if(!response.ok){
            return {success: false}
        }

        revalidatePath('/dashboard/departments')
    }catch(error:any){
        return{success:false}
    }
}
