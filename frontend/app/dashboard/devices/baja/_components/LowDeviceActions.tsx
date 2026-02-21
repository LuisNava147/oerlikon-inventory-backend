
import { Button, Tooltip } from "@heroui/react";
import { Edit, Eye, Pencil, Trash, Trash2 } from "lucide-react";
import Link from "next/link";

import { Device } from "@/entities";
import AddDeviceNote from "../../_components/device-table/AddDeviceNote";
import DeleteDeviceButton from "../../_components/device-table/DeleteDeviceButton";

export default function LowDeviceActions({devices}:{devices:Device}){
    return(
        <div className="flex items-center justify-center gap-2">
            <Tooltip content="Historial/Nota">
            <AddDeviceNote devices={devices} />
            </Tooltip>

            <Tooltip content="Eliminar">
            <DeleteDeviceButton device={devices} category="baja" />
            </Tooltip>
        </div>
    )
}