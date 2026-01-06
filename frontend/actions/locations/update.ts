"use server";
import { TOKEN_NAME, API_URL } from "@/constants";
import { Location } from "@/entities";
import { authHeaders } from "@/app/helpers/authHeaders";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function updateLocation(devices:string, formData: FormData) {
    const locationData = {
        locationName: formData.get("locationName"),
        locationAddress: formData.get("locationAddress")
    }

    const response = await fetch(`${API_URL}/locations/${devices}`,{
        method: "PATCH",
        body: JSON.stringify(locationData),
        headers:{
            'content-type':'application/json',
            ...authHeaders()
        }
    })
    const {locationId}:Location = await response.json()
    if(response.status == 200){
        revalidateTag("dashboard:locations")
        revalidateTag(`dashboard:locations${devices}`)
        redirect(`/dashboard?devices=${locationId}`)
    }
}