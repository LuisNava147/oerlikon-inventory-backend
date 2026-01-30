import { API_URL } from "@/constants";
import { Device, Employee } from "@/entities";
import { authHeaders } from "@/app/helpers/authHeaders";
import SearchEmployee from "./_components/employee-table/SearchEmployee";
import CreateEmployee from "./_components/employee-table/CreateEmployee";
import EmployeeList from "./_components/employee-table/EmployeeList";

export default async function EmployeePage({searchParams, onClose}:{searchParams:{[key:string]: string | string[] | undefined}, onClose:()=>void}){
    
    let employees: Employee[] = []
    const query = typeof searchParams?.q === 'string' ? searchParams.q : ""
    const filterBy = typeof searchParams?.f === 'string' ? searchParams.f : ""

    let endpoint = `${API_URL}/employees`
    if(query && filterBy){
        switch(filterBy){
            case "name":
                endpoint = `${API_URL}/employees/employee-name/${query}`
                break;
            case "email":
                endpoint = `${API_URL}/employees/employee-email/${query}`
                break;
            case "phone-number":
                endpoint = `${API_URL}/employees/employee-phone/${query}`
                break;
            case "location":
                endpoint = `${API_URL}/employees/location-name/${query}`
                break;
            default:
            break;
        }
    }

    const response = await fetch(endpoint,{
        headers:{
            ...authHeaders(),
        },
        next:{
            tags:['dashboard/employees']
        },
        cache:'no-cache'
    })

    if(response.ok){
        const data = await response.json()
        employees = Array.isArray(data) ? data : [data]
        
    }
    async function getLocations() {
        const response = await fetch(`${API_URL}/locations`,{
            headers:{
                ...authHeaders()
            },
            cache:'no-store'
        })
        return await response.json()
    }

    async function getDevices() {
        const response = await fetch(`${API_URL}/devices`,{
            headers:{
                ...authHeaders()
            },
            cache:'no-store'
        })
        return await response.json()
    }

        const locations = await getLocations()
        const devices = await getDevices()

        return(
            <div className="w-full h-auto flex flex-col gap-6 mt-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 ml-4">
                            Empleados Oerlikon
                        </h1>
                        <p className="text-slate-500 ml-4">
                        Gestiona el personal y sus asignaciones ({employees.length} empleados encontrados)
                        </p>
                    </div>
                    <div className="rounded-md mt-6">
                        <CreateEmployee locations={locations}/>
                    </div>
                </div>
                <SearchEmployee />
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-2">
                <EmployeeList devices={devices} employees={employees} locations={locations} onClose={onClose}/>
                </div>
            </div>
        ) 
}