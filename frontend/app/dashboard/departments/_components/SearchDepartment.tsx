'use client'

import { Input } from "@heroui/react"
import { Search, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function SearchDepartment(){
    const router= useRouter()
    const searchParams = useSearchParams()
    const initialQuery = searchParams.get("q") || ""
    const [query, setQuery] = useState(initialQuery)

    const handleSearch = (term: string) => {
        setQuery(term)
        if(!term.trim()){
            router.push("/dashboard/departments")
        }else{
            router.push(`/dashboard/departments?q=${encodeURIComponent(term)}`)
        }
    }
    const handleClear = () => {
        setQuery("")
        router.push("/dashboard/departments")
    }

    return(
        <div className="flex w-full md:max-w-md bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <Input className="w-full" placeholder="Buscar Departamento..." value={query} onValueChange={handleSearch}
            startContent={<Search size={18} className="text-slate-400" />} endContent={query && (
                <div className="cursor-pointer active:opacity-50" onClick={handleClear}>
                    <X size={16} className="text-slate-400 hover:text-red-500 transition-colors" />
                </div>
            )}
            size="md"
            variant="bordered"
            />
        </div>
    )
}