'use server'

import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { revalidatePath } from "next/cache"

export default async function updateMobile(deviceId:string, prevState:any, formData:FormData){
    const locationId= formData.get("location")?.toString()
    const employeeId = formData.get("employee")?.toString()
    const departmentId = formData.get("department")?.toString()

    try{
        const mobileData = {
            deviceHostName: formData.get("deviceHostName") || null,
            deviceAssetNumber: formData.get("deviceAssetNumber") || null,
            deviceType: formData.get("deviceType"),
            deviceModel: formData.get("deviceModel"),
            deviceBrand: formData.get("deviceBrand"),
            deviceSerialTag: formData.get("deviceSerialTag"),
            devicePassword: formData.get("devicePassword") || null,
            devicePin: formData.get("devicePin") || null,
            deviceAccount: formData.get("deviceAccount") || null,
            deviceStatus: formData.get("deviceStatus"),

            location: locationId ? locationId.toString() : null,
            employee: employeeId ? employeeId : null,
            department: departmentId ? departmentId : null
        }

        if (mobileData.deviceStatus === "BAJA") {
            mobileData.deviceStatus = "BAJA";
            mobileData.employee = null; // Aseguramos que no tenga empleado
            //console.log(">> Aplicando lógica de BAJA");
        } 
        // CASO B: Si NO es baja, aplicamos la lógica automática (Stock vs Asignado)
        else {
            if (!employeeId) {
                mobileData.deviceStatus = "Stock";
                //console.log(">> Sin empleado -> Forzando Stock");
            } else {
                mobileData.deviceStatus = "Asignado";
                //console.log(">> Con empleado -> Forzando Asignado");
            }
        }
        //console.log(mobileData)

        const response = await fetch(`${API_URL}/devices/${deviceId}`,{
            method: "PATCH",
            headers:{
                'content-type':'application/json',
                ...authHeaders(),
               
            },
            body: JSON.stringify(mobileData),
        })
        revalidatePath('/dashboard/departments')
        revalidatePath('/dashboard/devices')
        
        return{success:true, error:null}
    }catch(error:any){
        return{success:false, error: "Error de conexión."}
    }
}