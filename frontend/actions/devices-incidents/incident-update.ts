'use server'
import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { revalidatePath } from "next/cache"

export default async function updateDeviceIncident(incidentId:string, prevState:any, formData:FormData){
    const deviceId = formData.get("device")?.toString()
    const departmentId = formData.get("department")?.toString()

    const incidentData = {
        incidentNote: formData.get("incidentNote")?.toString().trim() || null,
        status: formData.get("status")?.toString().trim().toUpperCase() || "PENDIENTE",
        device: deviceId || null,
        department: departmentId || null,
        incidentDateClose: formData.get("incidentDateClose")?.toString() || null
    }

    if(incidentData.status === 'RESUELTO'){
            incidentData.incidentDateClose = new Date().toISOString()
    }else if(incidentData.status && incidentData.status !== "RESUELTO"){
        incidentData.incidentDateClose = null
    }
    //console.log(incidentData)   

    try{
        const response = await fetch(`${API_URL}/incidents/${incidentId}`,{
            method:"PATCH",
            headers:{
                ...authHeaders(),
                'Content-Type':'application/json'
            },
            body: JSON.stringify(incidentData)
        })
        if(!response.ok){
            const errorData = await response.json()
            return{success:false, error:errorData.mesagge || "Error al actualizar el incidente"}
        }
        revalidatePath('/dashboard/incidents')
        return{success:true, error: null}
    }catch(error: any){
        return{success:false,error:"Error de conexión con el servidor."}
    }
}