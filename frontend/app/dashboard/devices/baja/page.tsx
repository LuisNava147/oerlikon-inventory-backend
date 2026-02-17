import { authHeaders } from "@/app/helpers/authHeaders";
import { API_URL } from "@/constants";
import { Device } from "@/entities";
import { Button } from "@heroui/react";
import { ArrowLeft, ArchiveX } from "lucide-react";
import Link from "next/link";
import LowDeviceList from "./_components/LowDeviceList";


const CATEGORY_CONFIG = {
    computing:{
        label: "Computadoras (Laptops y Desktops)",
        types: ["Laptop","Desktop"],
        backUrl: "/dashboard/devices"
    },
    printing:{
        label: "Impresoras",
        types: ["Printer"],
        backUrl: "/dashboard/printers"
    },
    mobile:{
        label: "Dispositivos Móviles",
        types: ["Celular","Tablet","iPad"],
        backUrl: "/dashboard/smartphones"
    },
    peripheral:{
        label: "Periféricos",
        types: ["Teclado","Mouse","Docking","Diadema","Token","Bocina","Monitor","Lector de barras"],
        backUrl: "/dashboard/accesories"
    }


}
    interface Props {
        searchParams: { category?: string };
      }
     
      export default async function BajaPage({ searchParams }: Props) {
        // 1. Obtener configuración
        const categoryKey = (searchParams.category || 'computing') as keyof typeof CATEGORY_CONFIG;
        const config = CATEGORY_CONFIG[categoryKey] || CATEGORY_CONFIG.computing;
     
        // 2. Fetch de datos
        const res = await fetch(`${API_URL}/devices`, {
          headers: { ...authHeaders() },
          cache: "no-store",
        });
        const devices: Device[] = await res.json();
     
        // 3. Filtrar: Solo BAJAS + Tipos correctos
        const bajaDevices = devices.filter((device) => {
          return device.deviceStatus === "BAJA" &&
                 config.types.includes(device.deviceType || "");
        });
     
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-4">
              <Link href={config.backUrl}>
                <Button isIconOnly variant="flat" radius="full">
                  <ArrowLeft size={20} />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
                  <ArchiveX className="text-red-600" />
                  Historial de Bajas
                </h1>
                <p className="text-slate-500 text-sm">
                  Categoría: <span className="font-semibold text-slate-700">{config.label}</span>
                </p>
              </div>
            </div>
     
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <LowDeviceList devices={bajaDevices}/>
            </div>
          </div>
        );
}
