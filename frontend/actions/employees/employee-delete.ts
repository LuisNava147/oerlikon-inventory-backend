"use server"

import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { revalidatePath } from "next/cache"

export default async function deleteEmployee(employeeId:string): Promise<{success:boolean; error:string | null}>{
    try{
        const response = await fetch(`${API_URL}/employees/${employeeId}`,{
            method:"DELETE",
            headers:{
                ...authHeaders() 
            },
        })
        revalidatePath('/dashboard/employees')
        return{success:true, error: null}
    }catch(error){
        return{success:false, error:"Error de conexión."}
    }
}