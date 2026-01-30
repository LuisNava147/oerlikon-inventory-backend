'use client';

import { Input, Select, SelectItem, Button } from "@heroui/react";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchEmployee(){
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialFilter = searchParams.get("f") || "name";
    const initialQuery = searchParams.get("q") || "";
    const [query, setQuery] = useState(initialQuery);
    const [filter, setFilter] = useState<string>(initialFilter);

    const handleSearch = () => {
        if (!query.trim()) {
            router.push("/dashboard/employees");
        } else {
            router.push(`/dashboard/employees?q=${encodeURIComponent(query)}&f=${filter}`);
        }
    };

    const handleClear = () => {
        setQuery("");
        router.push("/dashboard/employees");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
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
                    <SelectItem key="name">Nombre de Empleado</SelectItem>
                    <SelectItem key="email">Correo Del Empleado</SelectItem>
                    <SelectItem key="phone-number">Número de Teléfono</SelectItem>
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
    )
}