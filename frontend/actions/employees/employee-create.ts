'use server'

import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { revalidatePath } from "next/cache"

export default async function createEmployee(prevState:any,formData: FormData){
    const name = formData.get("employeeName")?.toString().trim()
    const lastName = formData.get("employeeLastName")?.toString().trim()
    const email = formData.get("employeeEmail")?.toString().trim()
    const phone = formData.get("employeePhoneNumber")?.toString() || null
    const locationId = formData.get("location")?.toString() || null
    /*const deviceId = formData.get("device")?.toString()
    const userId = formData.get("user")?.toString()*/

    if(!name || !lastName || !email) return{success: false, error:"Todos los campos son obligatorios"}

    const employeeData = {
        employeeName: name,
        employeeLastName: lastName,
        employeeEmail: email,
        employeePhoneNumber: phone,
        location:locationId,
        /*deviceId:{deviceId: deviceId},
        userId:{userId:userId}*/
    }
    //console.log(employeeData)
    try{
        const response = await fetch(`${API_URL}/employees`,{
            method:"POST",
            headers:{
                'Content-Type':"application/json",
                ...authHeaders()
            },
            body:JSON.stringify(employeeData)
        })
        //console.log(await response.json())
        if(!response.ok){
            const errorData = await response.json()
            return{success:false, error: errorData.mesagge || "Error al crear empleado"}
        }

        revalidatePath('/dashboard/employees')
        return{success: true, error: null}
    }catch(error:any){
        return{success:false, error:"Error de conexión."}
    }
}