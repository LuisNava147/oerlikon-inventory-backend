'use server'
import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { revalidatePath } from "next/cache"

export default async function updateTicketIncident(ticketId:string, prevState:any, formData:FormData){
    const incidentData = {
        ticketDescription: formData.get("ticketDescription")?.toString().trim(),
        status: formData.get("status")?.toString().trim().toUpperCase() || "PENDIENTE",
        ticketDateClose: formData.get("ticketDateClose")?.toString() || null
    }

    if(incidentData.status === 'RESUELTO'){
        incidentData.ticketDateClose = new Date().toISOString()
    }else if(incidentData.status && incidentData.status !== "RESUELTO"){
        incidentData.ticketDateClose = null
    }
    //console.log(incidentData)

    try{
        const response = await fetch(`${API_URL}/ticket-incidents/${ticketId}`,{
            method:"PATCH",
            headers:{
                ...authHeaders(),
                'Content-Type':'application/json'
            },
            body: JSON.stringify(incidentData)
        })
        if(!response.ok){
            const errorData = await response.json()
            return{success:false, error:errorData.mesagge || "Error al actualizar el ticket"}
        }
        revalidatePath('/dashboard/incidents')
        return{success:true, error: null}
    }catch(error: any){
        return{success:false,error:"Error de conexión con el servidor."}
    }
}