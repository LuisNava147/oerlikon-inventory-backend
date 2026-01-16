'use client';

import { Input, Select, SelectItem, Button } from "@heroui/react";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchDevices() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // 1. BLINDAJE: Si 'f' viene vacío o null, usamos 'hostname'
    const initialFilter = searchParams.get("f") || "hostname";
    const initialQuery = searchParams.get("q") || "";

    const [query, setQuery] = useState(initialQuery);
    // 2. Estado seguro: filter nunca será undefined ni ""
    const [filter, setFilter] = useState<string>(initialFilter);

    const handleSearch = () => {
        if (!query.trim()) {
            router.push("/dashboard/devices");
        } else {
            router.push(`/dashboard/devices?q=${encodeURIComponent(query)}&f=${filter}`);
        }
    };

    const handleClear = () => {
        setQuery("");
        router.push("/dashboard/devices");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <div className="flex flex-col md:flex-row gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100 items-end md:items-center">
            
            <div className="w-full md:w-56">
                <Select 
                    label="Buscar por" 
                    // 3. Pasamos un Set con un valor garantizado (filter nunca es vacío)
                    selectedKeys={new Set([filter])} 
                    onChange={(e) => {
                        // 4. HeroUI devuelve el value directamente en target.value
                        if(e.target.value) setFilter(e.target.value);
                    }}
                    disallowEmptySelection
                    size="sm"
                    variant="faded"
                    color="primary"
                >
                    <SelectItem key="hostname">Hostname</SelectItem>
                    <SelectItem key="asset">Activo Fijo</SelectItem>
                    <SelectItem key="employee">Nombre Empleado</SelectItem>
                    <SelectItem key="brand">Marca</SelectItem>
                    <SelectItem key="type">Tipo de Dispositivo</SelectItem>
                    <SelectItem key="location">Ubicación</SelectItem>
                </Select>
            </div>

            <Input
                className="flex-1"
                placeholder={`Escribe el ${filter}...`}
                value={query}
                onValueChange={setQuery}
                onKeyDown={handleKeyDown}
                startContent={<Search size={18} className="text-slate-400" />}
                endContent={
                    query && (
                        <div className="cursor-pointer active:opacity-50" onClick={handleClear}>
                            <X size={16} className="text-slate-400 hover:text-red-500 transition-colors" />
                        </div>
                    )
                }
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
    );
}