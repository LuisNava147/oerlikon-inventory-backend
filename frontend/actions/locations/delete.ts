"use server";

import { API_URL, TOKEN_NAME } from "@/constants";
import { authHeaders } from "@/app/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteLocation(formData:FormData) {
    const locationId = formData.get("deleteValue")
    if(!locationId) return;
    const response= await fetch(`${API_URL}/locations/${locationId}`,{
        method: 'DELETE',
        headers:{
            ...authHeaders()
        }
    })
    if(response.status == 200){
        revalidateTag("dashboard:locations")
        redirect("/dashboard")
    }
   
}