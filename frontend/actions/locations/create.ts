"use server";
import { TOKEN_NAME, API_URL } from "@/constants";
import { Location } from "@/entities";
import { authHeaders } from "@/app/helpers/authHeaders";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createLocation(formData:FormData) {
    const locationData = {
        locationName: formData.get("locationName"),
        locationAddress: formData.get("locationAddress")
    }

    let newLocationId = null;

    try{
        const response = await fetch(`${API_URL}/locations/`,{
            method: "POST",
            body: JSON.stringify(locationData),
            headers:{
                'content-type': 'application/json',
                ...authHeaders()
            }
        })
        
        
        if(response.status == 201){
            const data: Location = await response.json()
            newLocationId= data.locationId
            revalidateTag("dashboard:locations");
            revalidatePath("/dashboard")
        }
    }catch(error){
        console.error("Error creando la ubicación: ", error)
    }
    
    if(newLocationId){
        redirect(`/dashboard?devices=${newLocationId}`)
    }
}
