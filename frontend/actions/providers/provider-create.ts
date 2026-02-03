"use server";

import { authHeaders } from "@/app/helpers/authHeaders";
import { API_URL } from "@/constants";
import { revalidatePath } from "next/cache";

export async function createProvider(prevState: any, formData: FormData) {

  const providerData = {
    providerName: formData.get("providerName")?.toString().trim(),
    providerContactName: formData.get("providerContactName")?.toString().trim(),
    providerEmail: formData.get("providerEmail")?.toString().trim() || null,
    providerPhoneNumber: formData.get("providerPhoneNumber")?.toString().trim() || null,
    location: formData.get("location")?.toString() || null, 
  };

  try {
    const response = await fetch(`${API_URL}/providers`, {
      method: "POST",
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
        error: errorData.message || "Error al crear el proveedor.",
      };
    }

    revalidatePath("/dashboard/providers");
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: "Error de conexión con el servidor." };
  }
}