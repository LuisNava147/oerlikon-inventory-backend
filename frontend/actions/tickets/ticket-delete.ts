"use server"

import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { revalidatePath } from "next/cache"

export default async function deleteTicketIncident(incidentId:string): Promise<{success:boolean, error:string | null}>{
    try{
        const response = await fetch(`${API_URL}/ticket-incidents/${incidentId}`,{
            method:"DELETE",
            headers:{
                ...authHeaders()
            },
        })
        //console.log(await response.json())
        revalidatePath('/dashboard/ticket-incidents')
        return{success:true, error:null}
    }catch(error){
        return{success:false, error: "Error de conexión."}
    }
}