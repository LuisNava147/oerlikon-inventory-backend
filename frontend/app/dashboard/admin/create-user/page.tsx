import { API_URL } from "@/constants";
import { Employee } from "@/entities";
import { authHeaders } from "@/app/helpers/authHeaders";
import FormCreateUser from "./_components/FormCreateUser";

export default async function CreateAdminPage(){
    let employees: Employee[] = []

    const response = await fetch(`${API_URL}/employees`,{
        headers:{
            ...authHeaders()
        },
        next:{
            tags:['dashboard:admin']
        },
        cache: 'no-store'
    })

    return(
        <div className="max-w-2xl mx-auto p-4 md:p-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Crear Usuario Administrador</h1>
                <p className="text-slate-500">Vincula un empleado existente para darle acceso al sistema.</p>
            </div>
          <FormCreateUser employees={employees} employeeId=""/> 
        </div>
    )
}