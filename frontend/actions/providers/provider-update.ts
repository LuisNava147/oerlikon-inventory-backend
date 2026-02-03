"use server";

import { authHeaders } from "@/app/helpers/authHeaders";
import { API_URL } from "@/constants";
import { revalidatePath } from "next/cache";

export default async function updateProvider(providerId: string, prevState: any, formData: FormData) {
  
  const providerData: any = {
    providerName: formData.get("providerName")?.toString().trim(),
    providerContactName: formData.get("providerContactName")?.toString().trim(),
    providerEmail: formData.get("providerEmail")?.toString().trim() || null,
    providerPhoneNumber: formData.get("providerPhoneNumber")?.toString().trim() || null,
  };

  // Solo enviamos location si el usuario seleccionó una nueva
  const locationId = formData.get("location")?.toString();
  if (locationId) {
    providerData.location = locationId;
  }

  try {
    const response = await fetch(`${API_URL}/providers/${providerId}`, {
      method: "PATCH",
      headers: {
        ...authHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(providerData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || "Error al actualizar el proveedor.",
      };
    }

    revalidatePath("/dashboard/providers");
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: "Error de conexión con el servidor." };
  }
}