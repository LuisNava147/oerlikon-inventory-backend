import { Button, Tooltip } from "@heroui/react";
import { Edit, Eye, Trash, Trash2 } from "lucide-react";
import Link from "next/link";


export default function DeviceActions({deviceId}:{deviceId:string}){
    return(
        <div className="flex items-center justify-center gap-2">
            <Tooltip content="Ver Detalles">
            <Link href={`/dashboard/devices/${deviceId}`}>
                <span className="text-lg text-slate-400 cursor-pointer active:opacity-50 hover:text-slate-700">
                    <Eye size={18} />
                </span>
            </Link>
            </Tooltip>

            <Tooltip content="Editar">
            <Link href={`/dashboard/devices/edit/${deviceId}`}>
                <span className="text-lg text-slate-400 cursor-pointer active:opacity-50 hover:text-slate-700">
                    <Edit size={18} />
                </span>
            </Link>
            </Tooltip>

            <Tooltip content="Eliminar">
            <Button className="text-lg text-danger cursor-pointer active:opacity-50 hover:text-red-700 bg-transparent border-none outline-none">
                <Trash2 size={18} />
            </Button>
            </Tooltip>
        </div>
    )
}