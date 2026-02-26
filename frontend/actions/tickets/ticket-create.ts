'use server'
import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { revalidatePath } from "next/cache"

export async function createTicketIncident(prevState:any, formData:FormData){
    const incidentData = {
        ticketName: formData.get("ticketName")?.toString().trim(),
        ticketLink: formData.get("ticketLink")?.toString().trim(),
        status: "PENDIENTE",
        ticketDescription: formData.get("ticketDescription")?.toString().trim()
    }
    //console.log(incidentData)

    try{
        const response = await fetch(`${API_URL}/ticket-incidents`,{
            method:"POST",
            headers:{
                ...authHeaders(),
                'Content-Type':'application/json'
            },
            body: JSON.stringify(incidentData)
        })
        //console.log(await response.json())
        if(!response.ok){
            const errorData = await response.json()
            return{success:false, error: errorData.mesagge || "Error al crear el ticket"}
        }
        revalidatePath('/dashboard/ticket-incidents')
        return{success: true, error:null}
    }catch(error:any){
        return{success:false, error: "Error de conexión con el servidor."}
    }
}