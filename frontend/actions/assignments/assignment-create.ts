"use server";
import { authHeaders } from "@/app/helpers/authHeaders";
import { API_URL } from "@/constants";
import { revalidatePath } from "next/cache";

export async function createAssignment(prevState: any, formData: FormData) {
  const employeeId = formData.get("employee")?.toString();
  const deviceIdsString = formData.get("deviceIds")?.toString() || ""; // "id1,id2,id3"
  const assignmentDate = formData.get("assignmentDate")?.toString();

  if (!employeeId || !deviceIdsString) {
    return { success: false, error: "Datos incompletos" };
  }

  // 1. Convertimos el string de IDs en un array
  const idsArray = deviceIdsString.split(",").filter(id => id.trim() !== "");

  const payload = {
    assigmentStatus: "Activo",
    assignmentDate: assignmentDate,
    employee: employeeId, // Enviamos objeto parcial
    device: idsArray // Array de objetos Device parciales
  };

  //console.log(payload)

  try {
    const response = await fetch(`${API_URL}/assignments`, {
      method: "POST",
      headers: {
        ...authHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    //console.log(await response.json())
    if (!response.ok) {
        const errorData = await response.json();
        return { success: false, error: errorData.message || "Error al crear" };
    }

    revalidatePath("/dashboard/assignments");
    revalidatePath("/dashboard/devices"); // Actualizamos status de equipos
    
    return { success: true, error: null };

  } catch (error) {
    return { success: false, error: "Error de conexión" };
  }
}