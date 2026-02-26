'use server'
import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { revalidatePath } from "next/cache"

export async function createDeviceIncident(prevState:any, formData:FormData){
    const deviceId = formData.get("device")?.toString()
    const departmentId = formData.get("department")?.toString()

    const incidentData = {
        reportNumber: formData.get("reportNumber")?.toString().trim(),
        incidentDescription: formData.get("incidentDescription")?.toString().trim(),
        incidentNote: formData.get("incidentNote")?.toString().trim() || null,
        status:  "PENDIENTE",
        device: deviceId || null,
        department: departmentId || null

    }
    //console.log(incidentData)

    try{
        const response = await fetch(`${API_URL}/incidents`,{
            method:"POST",
            headers:{
                ...authHeaders(),
                "Content-Type":"application/json",
            },
            body: JSON.stringify(incidentData)
        })
        //console.log(await response.json())
        if(!response.ok){
            const errorData = await response.json()
            return{success:false, error: errorData.mesagge || "Error al crear el incidente"}
        }
        revalidatePath('/dashboard/incidents')
        return{success:true, error:null}
    }catch(error:any){
        return{success:false,error:"Error de conexión con el servidor."}
    }
}