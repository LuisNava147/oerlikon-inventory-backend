"use server"

import { authHeaders } from "@/app/helpers/authHeaders"
import { API_URL } from "@/constants"
import { revalidatePath, revalidateTag } from "next/cache"

export async function deleteAdminUser(employeeId: string){
    try{
        const response = await fetch(`${API_URL}/auth/${employeeId}`,{
            method:'DELETE',
            headers:{
                ...authHeaders()
            }
        })

        if(!response.ok){
            const errorData = await response.text()
            throw new Error(errorData || "Error al eliminar el administrador")
        }

        revalidatePath("/dashboard/employees")
        return{success: true, error: null}
    }catch(error:any){
        throw new Error(error.message)
    }
}