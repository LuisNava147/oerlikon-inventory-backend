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
    
    const response = await fetch(`${API_URL}/locations/`,{
        method: "POST",
        body: JSON.stringify(locationData),
        headers:{
            'content-type': 'application/json',
            ...authHeaders()
        }
    })
    const {locationId}:Location = await response.json()
    
    if(response.status == 201){
        revalidateTag("dashboard:locations");
        redirect(`/dashboard?devices=${locationId}`)
    }
}
