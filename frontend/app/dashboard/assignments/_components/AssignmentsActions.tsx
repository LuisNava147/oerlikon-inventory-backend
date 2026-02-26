import { Button, Tooltip } from "@heroui/react";
import { Assignment, Device, Employee, Location } from "@/entities";

import dynamic from "next/dynamic";
import DeleteAssignmentButton from "./DeleteAssignmentButton";

const ResponsiveFilter = dynamic(
    () => import("./ResponsivePdfFilter"), 
    { ssr: false }
);

interface Props {
    assignments: Assignment,
}

export default function AssignmentActions({assignments}:Props){
    return(
        <div className="flex items-center justify-center gap-2">
            <Tooltip content="Descargar">
                <ResponsiveFilter assignment={assignments} />
            </Tooltip>
            <Tooltip content="Eliminar">
                <DeleteAssignmentButton assignment={assignments}/>
            </Tooltip>
        </div>
    )
}