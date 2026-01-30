import { Button, Tooltip } from "@heroui/react";
import { Device, Employee, Location } from "@/entities";
import UpdateEmployee from "./_components/employee-table/UpdateEmployee";
import DeleteEmployeeButton from "./_components/employee-table/DeleteEmployeeButton";

export default function EmployeeActions({locations, employees, onClose}:{locations:Location[], employees: Employee, onClose:()=>void}){
    return(
        <div className="flex items-center justify-center gap-2">
            <Tooltip content="Editar">
            <UpdateEmployee locations={locations} employees={employees} />
            </Tooltip>

            <Tooltip content="Eliminar">
            <DeleteEmployeeButton employee={employees} />
            </Tooltip>
        </div>
    )
}