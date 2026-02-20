"use server";

import { API_URL, TOKEN_NAME } from "@/constants";
import { authHeaders } from "@/app/helpers/authHeaders";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteLocation(locationId:string):Promise<{success: boolean; error: string | null}>{
    try{
        const response= await fetch(`${API_URL}/locations/${locationId}`,{
            method: 'DELETE',
            headers:{
                ...authHeaders()
            }
        })
        if(!response.ok){
            const errorText = await response.text()
            if(errorText.includes("foreign key constraint") || errorText.includes("violates foreign key")){
                return{
                    success: false,
                    error: "No se puede eliminar: Este departamento tiene equipos o impresoras asignados."
                }
            }
            return{success: false, error: "Error desconocido al eliminar."}
        }
        revalidatePath('dashboard/locations')
       return {success: true, error: null}
    }catch(error){
        return{success:false, error: "Error de conexión con el servidor"}
    }
    
   
}