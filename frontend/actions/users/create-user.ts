"use server";
import { authHeaders } from "@/app/helpers/authHeaders"
import { API_URL } from "@/constants"
import { User } from "@/entities"
import { revalidatePath, revalidateTag } from "next/cache"

export default async function CreateAdminUser(formData:FormData){
    const employeeId = formData.get("employeeId") as string 
  
   const data = {
    userEmail: formData.get("userEmail"),
    userPassword: formData.get("userPassword"),
    userRoles: "Admin"
   }

    await fetch(`${API_URL}/auth/register/${employeeId}?role=admin`,{
            method: "POST",
            headers:{
                ...authHeaders(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
   
    revalidatePath("dashboard/admin/users")
}