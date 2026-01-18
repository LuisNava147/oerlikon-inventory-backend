import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";

export async function CreateDevice(formData:FormData) {
    const deviceData = {
        deviceHostName: formData.get("deviceHostName"),
        deviceAssetNumber: formData.get("deviceAssetNumber"),
        deviceType: formData.get("deviceType"),
        deviceModel: formData.get("deviceModel"),
        deviceBrand: formData.get("deviceBrand"),
        location: formData.get("location") || null,
        employee: formData.get("employee") || null
    }
    console.log(deviceData)

    const response = await fetch(`${API_URL}/devices`,{
        method: "POST",
        headers:{
            ...authHeaders(),
            'Content-Type':'application/json',
        },
        body: JSON.stringify(deviceData)
    })
    if(!response.ok){
        const errorData = await response.json()
        console.error("Error creando dispositivo: ", errorData)
        return { error: "No se pudo crear el dispositivo. Revisa los datos." }
    }

    revalidatePath('/dashboard/devices');
    redirect('/dashboard/devices');
}