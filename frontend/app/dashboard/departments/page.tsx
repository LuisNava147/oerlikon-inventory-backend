import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { Deparment } from "@/entities"
import SearchDepartment from "./_components/SearchDepartment"
import DepartmentList from "./_components/DepartmentList"
import CreateDepartment from "./_components/CreateDepartment"

export default async function DepartmentPage({searchParams, onClose}:{searchParams: {[key:string]: string | string[] | undefined}, onClose: ()=>void}){
    const query = typeof searchParams?.q === 'string' ? searchParams.q : ""

    const response = await fetch(`${API_URL}/departments`, {
        headers:{
            ...authHeaders(),
        },
        cache: 'no-store'
    })
    let departments: Deparment[] = []

    if(response.ok){
        const data = await response.json()
        const rawDepartments = Array.isArray(data) ? data : [data]

        departments = rawDepartments.filter((d: Deparment) => {
            if(!query) return true
                return d.departmentName.toLowerCase().includes(query.toLowerCase())
        })
    }

    return (
        <div className="w-full mt-4">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Gestión de Departamentos</h1>
            <p className="text-slate-500">Administra las áreas operativas de la planta ({departments.length} departamentos encontrados) </p>
          </div>
    
          {/* --- AQUÍ ESTÁ LA CLAVE DEL DISEÑO --- */}
          {/* grid-cols-1: En móvil es 1 columna (uno abajo de otro) */}
          {/* lg:grid-cols-3: En PC son 3 columnas (se divide la pantalla) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* IZQUIERDA: Tabla (ocupa 2 espacios de 3) */}
            <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                     <SearchDepartment />
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-2">
                    <DepartmentList departments={departments} />
                </div>
            </div>
    
            {/* DERECHA: Formulario (ocupa 1 espacio de 3) */}
            <div className="lg:col-span-1 sticky top-6">
                <CreateDepartment />
            </div>
    
          </div>
        </div>
      );
}