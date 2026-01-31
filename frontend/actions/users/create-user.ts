"use server";
import { authHeaders } from "@/app/helpers/authHeaders"
import { API_URL } from "@/constants"
import { User } from "@/entities"
import { revalidatePath, revalidateTag } from "next/cache"

export default async function createAdminUser(formData:FormData){
    const employeeId = formData.get("employee")as string
  
   const dataUser = {
    employee: employeeId,
    userEmail: formData.get("userEmail"),
    userPassword: formData.get("userPassword"),
    userRoles: "Admin"
   }
   //console.log(dataUser)

   try{
    const response = await fetch(`${API_URL}/auth/register/${employeeId}?role=admin`,{
        method: "POST",
        headers:{
            ...authHeaders(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataUser)
    });
    
    const errorData = await response.text()
    if(!response.ok){
        let errorMessage= errorData
        try{
            const errorJson = JSON.parse(errorData)
            throw new Error(errorJson.message || errorData)
        }catch(error:any){
            throw new Error(errorData || `Error ${response.status}: no se pudo crear el usuario`)
        }
    }
    //console.log(await response.json())
    revalidatePath("dashboard/employees") 
    return {success: true}

   }catch(error:any){
    throw new Error(error.message)
   }
}