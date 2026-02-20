'use client'
import { Card, CardBody } from "@heroui/react";
import { Laptop2, PlusCircle, TriangleAlert, Users } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import QuickAction from "./QuickAction";

export default function DashboardActions() {
    return(
        <>
            <h3 className="text-3xl font-bold text-slate-800">Acceso Rápido</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <QuickAction icon={<Laptop2 size={24}/>} title = "Nuevo equipo" href="/dashboard/devices"
                color="hover:border-red-300 hover:bg-red-600 text-red-600 hover:text-white"/>
                <QuickAction icon={<Users size={24}/>} title = "Nuevo Empleado" href="/dashboard/employees"
                color="hover:border-red-300 hover:bg-red-600 text-red-600 hover:text-white"/>
                <QuickAction icon={<TriangleAlert size={24}/>} title = "Incidencias de Equipos" href="/dashboard/incidents"
                color="hover:border-red-300 hover:bg-red-600 text-red-600 hover:text-white"/>
                <QuickAction icon={<PlusCircle size={24}/>} title = "Generar Responsiva" href="/dashboard/assignments"
                color="hover:border-red-300 hover:bg-red-600 text-red-600 hover:text-white"/>  
            </div>
        </>
    )
}
