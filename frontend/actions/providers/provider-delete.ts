"use server";

import { authHeaders } from "@/app/helpers/authHeaders";
import { API_URL } from "@/constants";
import { revalidatePath } from "next/cache";

export default async function deleteProvider(providerId: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const response = await fetch(`${API_URL}/providers/${providerId}`, {
      method: "DELETE",
      headers: {
        ...authHeaders(),
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || "No se pudo eliminar el proveedor (posiblemente tenga registros asociados).",
      };
    }

    revalidatePath("/dashboard/providers");
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: "Error de conexión." };
  }
}