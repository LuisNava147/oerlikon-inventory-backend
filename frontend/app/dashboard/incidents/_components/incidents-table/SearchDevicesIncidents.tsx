'use client'

import { Button, Input, Select, SelectItem } from "@heroui/react"
import { Search, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function SearchDeviceIncident(){
    const router= useRouter()
    const searchParams = useSearchParams()
    const initialFilter = searchParams.get("f") || "report-number";
    const initialQuery = searchParams.get("q") || ""
    const [query, setQuery] = useState(initialQuery)
    const [filter, setFilter] = useState<string>(initialFilter);

    const handleSearch = () => {
        if (!query.trim()) {
            router.push("/dashboard/devices-incidents");
        } else {
            router.push(`/dashboard/devices-incidents?q=${encodeURIComponent(query)}&f=${filter}`);
        }
    };

    const handleClear = () => {
        setQuery("");
        router.push("/dashboard/devices-incidents");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSearch();
    };

    return(
        <div className="flex flex-col md:flex-row gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100 items-end md:items-center">
            <div className="w-full md:w-56">
                <Select 
                    label="Buscar por" 
                    selectedKeys={new Set([filter])} 
                    onChange={(e) => {
                        if(e.target.value) setFilter(e.target.value);
                    }}
                    disallowEmptySelection
                    size="sm"
                    variant="faded"
                    color="danger"
                >
                    <SelectItem key="report-number">Número de Reporte</SelectItem>
                    <SelectItem key="device-name">Nombre del Equipo</SelectItem>
                    <SelectItem key="department-name">Nombre de Departamento</SelectItem>
                    <SelectItem key="location-name">Ubicación</SelectItem>
                </Select>
            </div>
            <Input className="flex-1" placeholder="Buscar..." value={query} onValueChange={setQuery} onKeyDown={handleKeyDown}
            startContent={<Search size={18} className="text-slate-400" />} endContent={query && (
                <div className="cursor-pointer active:opacity-50" onClick={handleClear}>
                    <X size={16} className="text-slate-400 hover:text-red-500 transition-colors" />
                </div>
            )}
            size="md"
            />

            <Button 
                color="primary" 
                variant="solid" 
                onPress={handleSearch}
                className="font-semibold w-full md:w-auto"
            >
                Buscar
            </Button>
            
        </div>
    )
}