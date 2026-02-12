'use server'

import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { revalidatePath } from "next/cache"

export default async function updateEmployee(employeeId:string, prevState:any, formData:FormData){
    const locationId = formData.get("location")?.toString() || null
    const departmentId = formData.get("department")?.toString() || null
    /*const deviceId = formData.get("device")?.toString()
    const userId = formData.get("user")?.toString()*/

    const employeeData = {
        employeeName: formData.get("employeeName"),
        employeeLastName: formData.get("employeeLastName"),
        employeeEmail: formData.get("employeeEmail"),
        employeePhoneNumber: formData.get("employeePhoneNumber")?.toString() || null,
        location:locationId,
        department:departmentId
        /*device:{device: deviceId},
        user:{user:userId}*/
    }

    if(!employeeData) return{success: false, error:"Todos los campos son obligatorios"}

    try{
        const response = await fetch(`${API_URL}/employees/${employeeId}`,{
            method: "PATCH",
            headers:{
                'content-type':'application/json',
                ...authHeaders()
            },
            body: JSON.stringify(employeeData)
        })
        //console.log(await response.json())
        if(!response.ok){
            const errorData = await response.json()
            return{success:false, error: errorData.mesagge || "Error al crear empleado"}
        }
        revalidatePath('/dashboard/employees')
        return{success:true, error:null}
    }catch(error:any){
        return{success:false, error:"Error de conexión." }
    }
}