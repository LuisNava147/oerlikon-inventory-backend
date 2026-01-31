import { Button, Tooltip } from "@heroui/react";
import { Device, Employee, Location } from "@/entities";
import UpdateEmployee from "./UpdateEmployee";
import DeleteEmployeeButton from "./DeleteEmployeeButton";
import FormCreateUser from "../user-table/FormCreateUser";
import CreateUser from "../user-table/CreateUser";

export default function EmployeeActions({locations, employees, onClose}:{locations:Location[], employees: Employee, onClose:()=>void}){
    return(
        <div className="flex items-center justify-center gap-2">
        <Tooltip content= "Admin">
            <CreateUser employees={employees}/>
        </Tooltip>
            <Tooltip content="Editar">
            <UpdateEmployee locations={locations} employees={employees} />
            </Tooltip>

            <Tooltip content="Eliminar">
            <DeleteEmployeeButton employee={employees} />
            </Tooltip>
        </div>
    )
}