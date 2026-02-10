import { Assignment, Device } from "@/entities";
import { API_URL } from "@/constants";
import { authHeaders } from "@/app/helpers/authHeaders";
import CreateAssignment from "./_components/CreateAssignment";
import AssignmentList from "./_components/AssignmentList";

export default async function AssignmentPage({searchParams, onClose}:{searchParams:{[key:string]: string | string[] | undefined}, onClose:()=>void}){

    let assignments: Assignment[] = []
    const response = await fetch(`${API_URL}/assignments`,{
        headers:{
            ...authHeaders()
        },
        next:{
            tags:["dashboard:assignments"]
        },
        cache: 'no-cache'
    })

    if(response.ok){
        const data = await response.json()
        assignments = Array.isArray(data) ? data : [data]
    }

    async function getDevices() {
        const response = await fetch(`${API_URL}/devices`,{
            headers:{
                ...authHeaders(),
            },
            cache: 'no-store'
        })
        return await response.json()
    }

    async function getEmployees() {
        const response = await fetch(`${API_URL}/employees`,{
            headers:{
                ...authHeaders(),
            },
            cache: 'no-store'
        })
        return await response.json()
    }

    const devices = await getDevices()
    const employees = await getEmployees() 
    
    return(
        <div className="w-full h-auto flex flex-col gap-6 mt-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 ml-4">Responsivas de Equipos IT</h1>
                    <p className="text-slate-500 ml-4">
                        Cartas Responsivas a Empleados ({assignments.length} encontrados)
                    </p>
                </div>
               
                <div className="rounded-md mt-6">
                    <CreateAssignment employees={employees} devices={devices}/>
                    
                </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-2">
                <AssignmentList employees={employees} devices={devices} assignments={assignments} onClose={onClose}/>
            </div>
        </div>
        
    )
}