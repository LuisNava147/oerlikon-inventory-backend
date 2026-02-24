"use server"

import { authHeaders } from "@/app/helpers/authHeaders"
import { API_URL } from "@/constants"
import { revalidatePath, revalidateTag } from "next/cache"

export  async function updateAdminUser(formData:FormData){
    const employeeId = formData.get("employee") as string
    const newPassword = formData.get("userPassword")

    try{
        const response = await fetch(`${API_URL}/auth/update-password/${employeeId}`,{
            method:"PATCH",
            headers:{
                ...authHeaders(),
                'Content-Type':'application/json'
            },
            body: JSON.stringify({userPassword: newPassword})
        })
        //console.log(await response.json())
        if(!response.ok){
            const errorData = await response.text()
            throw new Error(errorData || "Error al Actualizar contraseña")
        }
        
        revalidatePath("/dashboard/employees")
        return{success: true, error: null}
    }catch(error:any){
        throw new Error(error.message)
    }
}