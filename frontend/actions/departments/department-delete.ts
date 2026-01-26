"use server"

import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { revalidatePath } from "next/cache"

export async function deleteDepartment(departmentId:string):Promise<{success: boolean; error: string | null}>{
    try{
        const response = await fetch(`${API_URL}/departments/${departmentId}`,{
            method:"DELETE",
            headers:{
                ...authHeaders()
            }
        })
        //console.log(await response.json())

        revalidatePath('dashboard/departments')
       return {success: true, error: null}
    }catch(error){
        return{success:false, error: "Error de conexión"}
    }
}