import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import { Deparment } from "@/entities"
import SearchDepartment from "./_components/SearchDepartment"
import DepartmentList from "./_components/DepartmentList"
import CreateDepartment from "./_components/CreateDepartment"
import Link from "next/link"
import { Button } from "@heroui/react"
import { ArrowLeft, Printer } from "lucide-react"

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
        <div className="w-full h-full flex flex-col gap-8 mt-4">
           
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
            <h1 className="text-3xl font-bold text-slate-800 ml-4">Gestión de Departamentos</h1>
            <p className="text-slate-500 ml-4">Administra las áreas operativas de la planta ({departments.length} departamentos encontrados) </p>
            </div>
           
            
            <div className="rounded-md mt-6 flex md:flex-row gap-3">
                <Link href={"/dashboard/printers"}>
                <Button color="secondary" variant="flat" className="font-bold w-full md:w-auto" startContent={<Printer size={20}/>}>
                            Impresoras
                        </Button>
                </Link>
            </div>
           
          </div>
         
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 ">
                     <SearchDepartment />
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-2">
                    <DepartmentList departments={departments} />
                </div>
            </div>
    
    
            {/* DERECHA: Formulario (ocupa 1 espacio de 3) */}
            <div className="lg:col-span-1 sticky top-6 flex flex-col gap-4" >
            
                <CreateDepartment />
            </div>
    
          </div>
        </div>
      );
}