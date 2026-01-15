'use client'
import { Employee } from "@/entities";
import { Select, SelectItem } from "@heroui/react";
import { useRouter } from "next/navigation";

export default async function SelectEmployee({employees, employeeId}:{employees: Employee[], employeeId:string}) {
    const router = useRouter();
    return(
        <Select placeholder="Selecciona un empleado" label="Buscar Empleados" classNames={{mainWrapper: "hover:ring-2 ring-red-300 rounded-xl transition-all"}}
        selectedKeys={ employeeId ? new Set([employeeId]):undefined} onChange={((e)=>{
            if(e.target.value == undefined){
                router.push('/dashboard/admin/create-user')
            }else{
                router.push(`/dashboard?devices=${e.target.value}`)
            }
        })}
        >
            {employees.map((employees: Employee)=>{
                return(
                    <SelectItem key={employees.employeeId} value={employees.employeeId} textValue={`${employees.employeeName} 
                        ${employees.employeeLastName}`}>
                            {employees.employeeName} {employees.employeeLastName} {employees.employeeEmail}
                        </SelectItem>
                )
            })}
        </Select>
    )
}