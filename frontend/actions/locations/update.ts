"use server";
import { TOKEN_NAME, API_URL } from "@/constants";
import { Location } from "@/entities";
import { authHeaders } from "@/app/helpers/authHeaders";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function updateLocation(locationId:string,prevState: any, formData: FormData) {
    const locationData = {
        locationName: formData.get("locationName"),
        locationAddress: formData.get("locationAddress")
    }
   
    try{
        const response = await fetch(`${API_URL}/locations/${locationId}`,{
            method: "PATCH",
            headers:{
                'content-type':'application/json',
                ...authHeaders()
            },
            body: JSON.stringify(locationData)
        })
        if(!response.ok)return {success:false, error: "Error al actualizar la ubicación"}
        revalidatePath("dashboard/locations")
        return{success:true, error:null}
    }catch(error){
        return{success:false, error:"Error de conexión"}
    }
}