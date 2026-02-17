'use server'
import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { revalidatePath, revalidateTag } from "next/cache"

export async function updateAccesories(accesorieId: string, prevState:any, formData:FormData){
    const getVal = (key: string)=>{
        const val = formData.get(key)?.toString().trim()
        return val === "" ? null : val
    }

    const locationId= formData.get("location")?.toString()
    const employeeId = formData.get("employee")?.toString()
    const departmentId = formData.get("department")?.toString()

    try{
        const accesorieData = {
        deviceAssetNumber: getVal("deviceAssetNumber") || null,
        deviceType: formData.get("deviceType"),
        deviceModel: formData.get("deviceModel"),
        deviceBrand: formData.get("deviceBrand"),
        deviceSerialTag: formData.get("deviceSerialTag"),
        deviceStatus: formData.get("deviceStatus"),

        location: locationId ? locationId.toString() : null || null,
        employee: employeeId ? employeeId : null,
        department: departmentId ? departmentId : null
        }

        if (accesorieData.deviceStatus === "BAJA") {
            accesorieData.deviceStatus = "BAJA";
            accesorieData.employee = null; // Aseguramos que no tenga empleado
            console.log(">> Aplicando lógica de BAJA");
        } 
        // CASO B: Si NO es baja, aplicamos la lógica automática (Stock vs Asignado)
        else {
            if (!employeeId) {
                accesorieData.deviceStatus = "Stock";
                console.log(">> Sin empleado -> Forzando Stock");
            } else {
                accesorieData.deviceStatus = "Asignado";
                console.log(">> Con empleado -> Forzando Asignado");
            }
        }

        const response = await fetch(`${API_URL}/devices/${accesorieId}`,{
            method:"PATCH",
            headers:{
                'Content-Type':'application/json',
                ...authHeaders(),
            },
            body: JSON.stringify(accesorieData)
        })
        revalidatePath('/dashboard/accesories')
        return{success:true, error: null}
    }catch(error){
        return{success:false, error: "Error de conexión."}
    }
}