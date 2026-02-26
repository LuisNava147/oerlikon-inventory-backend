import { Button, Tooltip } from "@heroui/react";
import { Deparment, Device, Employee, Location } from "@/entities";
import UpdateEmployee from "./UpdateEmployee";
import DeleteEmployeeButton from "./DeleteEmployeeButton";
import FormCreateUser from "../user-table/FormCreateUser";
import CreateUser from "../user-table/CreateUser";

interface Props {
    locations:Location[]
    employees: Employee
    departments: Deparment[]
}

export default function EmployeeActions({locations, employees, departments}:Props){
    return(
        <div className="flex items-center justify-center gap-2">
        <Tooltip content= "Admin">
            <CreateUser employees={employees}/>
        </Tooltip>
            <Tooltip content="Editar">
            <UpdateEmployee locations={locations} departments={departments} employees={employees} />
            </Tooltip>

            <Tooltip content="Eliminar">
            <DeleteEmployeeButton employee={employees} />
            </Tooltip>
        </div>
    )
}