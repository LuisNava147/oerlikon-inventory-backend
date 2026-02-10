"use server"

import { authHeaders } from "@/app/helpers/authHeaders";
import { API_URL } from "@/constants";
import { revalidatePath } from "next/cache";

export default async function deleteAssignment(assignmentId:string): Promise<{success:boolean; error:string | null}>{
    try{
        const response = await fetch(`${API_URL}/assignments/${assignmentId}`,{
            method:"DELETE",
            headers:{
                ...authHeaders()
            }
        })
        console.log(await response.json())
        revalidatePath('/dashboard/assignments')

        return{success: true, error:null}
    }catch(error){
        return{success:false, error: "Error de conexión con el servidor."}
    }
}